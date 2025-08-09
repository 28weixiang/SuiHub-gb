module suihub::gig_listing {
    use std::string;
    use sui::object::{Self, UID};
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;

    struct Gig has key, store {
        id: UID,
        title: string::String,
        description: string::String,
        budget: u64,
        poster: address,
        is_active: bool,
        category: string::String,
        skills_required: vector<string::String>,
        deadline: u64,
    }

    struct GigCreated has copy, drop {
        gig_id: address,
        poster: address,
        title: string::String,
        budget: u64,
    }

    public entry fun create_gig(
        title: string::String,
        description: string::String,
        budget: u64,
        category: string::String,
        skills_required: vector<string::String>,
        deadline: u64,
        ctx: &mut TxContext
    ) {
        let gig = Gig {
            id: object::new(ctx),
            title,
            description,
            budget,
            poster: tx_context::sender(ctx),
            is_active: true,
            category,
            skills_required,
            deadline,
        };

        let gig_id = object::uid_to_address(&gig.id);
        
        sui::event::emit(GigCreated {
            gig_id,
            poster: tx_context::sender(ctx),
            title: gig.title,
            budget: gig.budget,
        });

        transfer::public_transfer(gig, tx_context::sender(ctx));
    }

    public entry fun update_gig_status(
        gig: &mut Gig,
        is_active: bool,
        ctx: &mut TxContext
    ) {
        assert!(tx_context::sender(ctx) == gig.poster, 1);
        gig.is_active = is_active;
    }

    public fun get_gig_details(gig: &Gig): (string::String, string::String, u64, address, bool) {
        (gig.title, gig.description, gig.budget, gig.poster, gig.is_active)
    }
}
