module suihub::escrow {
    use sui::object::{Self, UID};
    use sui::coin::{Self, Coin};
    use sui::sui::SUI;
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;
    use sui::balance::{Self, Balance};
    use std::string;

    struct Escrow<phantom T> has key {
        id: UID,
        payment: Balance<T>,
        poster: address,
        worker: address,
        gig_title: string::String,
        status: u8, // 0: pending, 1: funded, 2: in_progress, 3: completed, 4: disputed
        milestones: vector<Milestone>,
        current_milestone: u64,
    }

    struct Milestone has store, copy, drop {
        title: string::String,
        amount: u64,
        is_completed: bool,
        due_date: u64,
    }

    struct EscrowCreated has copy, drop {
        escrow_id: address,
        poster: address,
        worker: address,
        amount: u64,
        gig_title: string::String,
    }

    struct PaymentReleased has copy, drop {
        escrow_id: address,
        worker: address,
        amount: u64,
    }

    const ESCROW_PENDING: u8 = 0;
    const ESCROW_FUNDED: u8 = 1;
    const ESCROW_IN_PROGRESS: u8 = 2;
    const ESCROW_COMPLETED: u8 = 3;
    const ESCROW_DISPUTED: u8 = 4;

    const E_NOT_AUTHORIZED: u64 = 1;
    const E_INVALID_STATUS: u64 = 2;
    const E_INSUFFICIENT_PAYMENT: u64 = 3;

    public entry fun create_escrow(
        worker: address,
        gig_title: string::String,
        payment: Coin<SUI>,
        milestones: vector<string::String>,
        milestone_amounts: vector<u64>,
        milestone_dates: vector<u64>,
        ctx: &mut TxContext
    ) {
        let payment_amount = coin::value(&payment);
        let payment_balance = coin::into_balance(payment);
        
        let milestone_structs = vector::empty<Milestone>();
        let i = 0;
        while (i < vector::length(&milestones)) {
            let milestone = Milestone {
                title: *vector::borrow(&milestones, i),
                amount: *vector::borrow(&milestone_amounts, i),
                is_completed: false,
                due_date: *vector::borrow(&milestone_dates, i),
            };
            vector::push_back(&mut milestone_structs, milestone);
            i = i + 1;
        };

        let escrow = Escrow {
            id: object::new(ctx),
            payment: payment_balance,
            poster: tx_context::sender(ctx),
            worker,
            gig_title,
            status: ESCROW_FUNDED,
            milestones: milestone_structs,
            current_milestone: 0,
        };

        let escrow_id = object::uid_to_address(&escrow.id);

        sui::event::emit(EscrowCreated {
            escrow_id,
            poster: tx_context::sender(ctx),
            worker,
            amount: payment_amount,
            gig_title,
        });

        transfer::share_object(escrow);
    }

    public entry fun start_work(
        escrow: &mut Escrow<SUI>,
        ctx: &mut TxContext
    ) {
        assert!(tx_context::sender(ctx) == escrow.worker, E_NOT_AUTHORIZED);
        assert!(escrow.status == ESCROW_FUNDED, E_INVALID_STATUS);
        escrow.status = ESCROW_IN_PROGRESS;
    }

    public entry fun complete_milestone(
        escrow: &mut Escrow<SUI>,
        milestone_index: u64,
        ctx: &mut TxContext
    ) {
        assert!(tx_context::sender(ctx) == escrow.poster, E_NOT_AUTHORIZED);
        assert!(milestone_index < vector::length(&escrow.milestones), E_INVALID_STATUS);
        
        let milestone = vector::borrow_mut(&mut escrow.milestones, milestone_index);
        milestone.is_completed = true;
        
        if (milestone_index == escrow.current_milestone) {
            escrow.current_milestone = escrow.current_milestone + 1;
        };
    }

    public entry fun release_payment(
        escrow: &mut Escrow<SUI>,
        ctx: &mut TxContext
    ) {
        assert!(tx_context::sender(ctx) == escrow.poster, E_NOT_AUTHORIZED);
        assert!(escrow.status == ESCROW_IN_PROGRESS || escrow.status == ESCROW_COMPLETED, E_INVALID_STATUS);
        
        let payment_amount = balance::value(&escrow.payment);
        let payment_coin = coin::from_balance(balance::withdraw_all(&mut escrow.payment), ctx);
        
        sui::event::emit(PaymentReleased {
            escrow_id: object::uid_to_address(&escrow.id),
            worker: escrow.worker,
            amount: payment_amount,
        });

        transfer::public_transfer(payment_coin, escrow.worker);
        escrow.status = ESCROW_COMPLETED;
    }

    public entry fun dispute_escrow(
        escrow: &mut Escrow<SUI>,
        ctx: &mut TxContext
    ) {
        assert!(
            tx_context::sender(ctx) == escrow.poster || tx_context::sender(ctx) == escrow.worker, 
            E_NOT_AUTHORIZED
        );
        escrow.status = ESCROW_DISPUTED;
    }

    public fun get_escrow_status(escrow: &Escrow<SUI>): u8 {
        escrow.status
    }

    public fun get_escrow_details(escrow: &Escrow<SUI>): (address, address, u64, string::String, u8) {
        (
            escrow.poster,
            escrow.worker,
            balance::value(&escrow.payment),
            escrow.gig_title,
            escrow.status
        )
    }
}
