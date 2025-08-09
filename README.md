# SuiHub

SuiHub is a decentralized gig marketplace built on the **Sui blockchain**.  
It uses **Move smart contracts** for on-chain gig listings, escrow payments, and NFT achievement badges, with a **Next.js frontend** for user interaction.

---

## 📌 Overview

SuiHub allows:
- Clubs or users to **create and list gigs** (jobs/events) on-chain.
- Clients to **fund gigs via escrow** until milestones are completed.
- Users to **receive NFT badges** for attending events or completing tasks.

This ensures **security, transparency, and proof of participation** using blockchain technology.

---

## ✨ Features

### 1. **Gig Listing**
- Post gigs with **title, description, budget, deadline, and required skills**.
- Stored on-chain for transparency.
- Event emitted for real-time frontend updates.

### 2. **Escrow Payments**
- Secure payment system that locks funds until milestones are completed.
- Supports **status changes**: `Pending → Funded → In Progress → Completed → Disputed`.
- Payments only released when both parties agree.

### 3. **NFT Badges**
- Clubs can mint **NFT badges** to attendees.
- Supports rarities: **Common, Rare, Epic, Legendary**.
- Metadata includes event details and proof of attendance.

---

## 🛠 Tech Stack

- **Blockchain**: [Sui Move](https://docs.sui.io/)
- **Smart Contracts**: Move language
- **Frontend**: Next.js + Tailwind CSS
- **Wallet Integration**: @mysten/sui.js
- **Hosting**: Vercel

---

## 📂 Repository Structure

