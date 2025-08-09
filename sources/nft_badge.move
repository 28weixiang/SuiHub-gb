module suihub::nft_badge {
    use sui::object::{Self, UID};
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;
    use sui::url::{Self, Url};
    use std::string::{Self, String};

    struct EventBadge has key, store {
        id: UID,
        event_name: String,
        attendee: address,
        event_date: u64,
        organizer: address,
        badge_type: String, // workshop, hackathon, competition, etc.
        rarity: u8, // 1: common, 2: rare, 3: epic, 4: legendary
        image_url: Url,
        attributes: vector<Attribute>,
    }

    struct Attribute has store, copy, drop {
        trait_type: String,
        value: String,
    }

    struct BadgeMinted has copy, drop {
        badge_id: address,
        event_name: String,
        attendee: address,
        organizer: address,
        rarity: u8,
    }

    struct BadgeCollection has key {
        id: UID,
        owner: address,
        badges: vector<address>,
        total_badges: u64,
        legendary_count: u64,
        epic_count: u64,
        rare_count: u64,
        common_count: u64,
    }

    const E_NOT_AUTHORIZED: u64 = 1;
    const E_INVALID_RARITY: u64 = 2;

    const RARITY_COMMON: u8 = 1;
    const RARITY_RARE: u8 = 2;
    const RARITY_EPIC: u8 = 3;
    const RARITY_LEGENDARY: u8 = 4;

    public entry fun mint_badge(
        event_name: String,
        attendee: address,
        event_date: u64,
        badge_type: String,
        rarity: u8,
        image_url: vector<u8>,
        trait_types: vector<String>,
        trait_values: vector<String>,
        ctx: &mut TxContext
    ) {
        assert!(rarity >= RARITY_COMMON && rarity <= RARITY_LEGENDARY, E_INVALID_RARITY);
        
        let attributes = vector::empty<Attribute>();
        let i = 0;
        while (i < vector::length(&trait_types)) {
            let attribute = Attribute {
                trait_type: *vector::borrow(&trait_types, i),
                value: *vector::borrow(&trait_values, i),
            };
            vector::push_back(&mut attributes, attribute);
            i = i + 1;
        };

        let badge = EventBadge {
            id: object::new(ctx),
            event_name,
            attendee,
            event_date,
            organizer: tx_context::sender(ctx),
            badge_type,
            rarity,
            image_url: url::new_unsafe_from_bytes(image_url),
            attributes,
        };

        let badge_id = object::uid_to_address(&badge.id);

        sui::event::emit(BadgeMinted {
            badge_id,
            event_name,
            attendee,
            organizer: tx_context::sender(ctx),
            rarity,
        });

        transfer::public_transfer(badge, attendee);
    }

    public entry fun create_badge_collection(ctx: &mut TxContext) {
        let collection = BadgeCollection {
            id: object::new(ctx),
            owner: tx_context::sender(ctx),
            badges: vector::empty<address>(),
            total_badges: 0,
            legendary_count: 0,
            epic_count: 0,
            rare_count: 0,
            common_count: 0,
        };

        transfer::transfer(collection, tx_context::sender(ctx));
    }

    public entry fun add_badge_to_collection(
        collection: &mut BadgeCollection,
        badge_id: address,
        rarity: u8,
        ctx: &mut TxContext
    ) {
        assert!(tx_context::sender(ctx) == collection.owner, E_NOT_AUTHORIZED);
        
        vector::push_back(&mut collection.badges, badge_id);
        collection.total_badges = collection.total_badges + 1;

        if (rarity == RARITY_LEGENDARY) {
            collection.legendary_count = collection.legendary_count + 1;
        } else if (rarity == RARITY_EPIC) {
            collection.epic_count = collection.epic_count + 1;
        } else if (rarity == RARITY_RARE) {
            collection.rare_count = collection.rare_count + 1;
        } else {
            collection.common_count = collection.common_count + 1;
        };
    }

    public fun get_badge_details(badge: &EventBadge): (String, address, u64, address, String, u8) {
        (
            badge.event_name,
            badge.attendee,
            badge.event_date,
            badge.organizer,
            badge.badge_type,
            badge.rarity
        )
    }

    public fun get_collection_stats(collection: &BadgeCollection): (u64, u64, u64, u64, u64) {
        (
            collection.total_badges,
            collection.legendary_count,
            collection.epic_count,
            collection.rare_count,
            collection.common_count
        )
    }
}
