#!/bin/bash

echo "🚀 Publishing SuiHub Move modules to Sui blockchain..."

# Check if sui client is installed
if ! command -v sui &> /dev/null; then
    echo "❌ Sui client not found. Please install it first:"
    echo "curl -fLJO https://github.com/MystenLabs/sui/releases/download/testnet-v1.14.2/sui-testnet-v1.14.2-ubuntu-x86_64.tgz"
    exit 1
fi

# Check if we have an active address
if ! sui client active-address &> /dev/null; then
    echo "❌ No active Sui address found. Please set up your wallet first:"
    echo "sui client new-address ed25519"
    exit 1
fi

echo "📋 Active address: $(sui client active-address)"
echo "💰 Current balance:"
sui client gas

echo ""
echo "🔨 Building Move modules..."
sui move build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "📦 Publishing to Sui testnet..."
    
    # Publish with higher gas budget for complex modules
    PUBLISH_OUTPUT=$(sui client publish --gas-budget 100000000 --json)
    
    if [ $? -eq 0 ]; then
        echo "✅ Successfully published SuiHub modules!"
        echo ""
        echo "📋 Publication Details:"
        echo "$PUBLISH_OUTPUT" | jq -r '.objectChanges[] | select(.type == "published") | "Package ID: " + .packageId'
        
        # Extract package ID for easy copying
        PACKAGE_ID=$(echo "$PUBLISH_OUTPUT" | jq -r '.objectChanges[] | select(.type == "published") | .packageId')
        
        echo ""
        echo "🎯 IMPORTANT: Save this Package ID for your frontend:"
        echo "PACKAGE_ID = \"$PACKAGE_ID\""
        echo ""
        echo "📝 Next steps:"
        echo "1. Copy the Package ID above"
        echo "2. Add it to your .env.local file:"
        echo "   NEXT_PUBLIC_PACKAGE_ID=$PACKAGE_ID"
        echo "3. Install frontend dependencies:"
        echo "   npm install @mysten/sui.js @mysten/dapp-kit"
        echo "4. Update your wallet connection to use real Sui functions"
        
    else
        echo "❌ Publication failed. Check your gas balance and try again."
        exit 1
    fi
else
    echo "❌ Build failed. Please check your Move code for errors."
    exit 1
fi
