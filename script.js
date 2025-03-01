// Game state
const game = {
    experience: 0,
    albums: 0,
    money: 0,
    fame: 0,
    fans: 0,
    totalAlbumsSold: 0,
    
    // Social Media
    socialMediaLevel: 0,
    socialMediaCost: 100,
    
    // Stats
    xpPerPractice: 1,
    albumValue: 5,
    salesPerSecond: 0,
    salesMultiplier: 1,
    
    // Upgrades
    hasBetterGuitar: false,
    hasRecordingEquipment: false,
    hasMarketing: false,
    hasStudioTime: false,
    hasProducer: false,
    
    // Collab
    isCollabActive: false,
    collabMultiplier: 1,
    collabTimeLeft: 0,
    collabIntervalId: null,

    // Intervals
    autoSaveIntervalId: null,
    gameLoopIntervalId: null,
    autoPracticeIntervalId: null,
    checkCollabIntervalId: null,

    // New properties
    baseAlbumCost: 100,
    albumCostMultiplier: 1.5,
    currentAlbumCost: 100,
    
    // Add genre system
    currentGenre: "Folk",
    unlockedGenres: ["Folk"],
    genreMultipliers: {
        "Folk": 1,
        "Rock": 1.5,
        "Pop": 2,
        "Hip Hop": 3,
        "Electronic": 4,
        "Classical": 5
    },
    genreUnlockCosts: {
        "Rock": 10,
        "Pop": 25,
        "Hip Hop": 50,
        "Electronic": 100,
        "Classical": 200
    },

    // Tour system upgrades
    tourLevel: 0,
    baseTourAlbumCost: 5,
    tourAlbumCostMultiplier: 1.3,
    currentTourAlbumCost: 5,
    baseTourMoneyCost: 5000,
    tourMoneyCostMultiplier: 1.5,
    currentTourMoneyCost: 5000,

    // Band members
    hasDrummer: false,
    hasBassist: false,
    hasKeyboardist: false,

    // Upgrade tracking
    upgradeCounts: {
        betterGuitar: 0,
        recordingEquipment: 0,
        marketing: 0,
        studioTime: 0,
        producer: 0
    },
    
    // Base costs
    upgradeCosts: {
        betterGuitar: 50,
        recordingEquipment: 200,
        marketing: 500,
        studioTime: 1000,
        producer: 3000
    },
    
    // Current costs (will increase)
    currentUpgradeCosts: {
        betterGuitar: 50,
        recordingEquipment: 200,
        marketing: 500,
        studioTime: 1000,
        producer: 3000
    },
    
    // Cost multiplier for upgrades
    upgradeCostMultiplier: 1.8,

    // Auto-practice rate
    autoPracticeRate: 1,

    // Metronome
    hasMetronome: false,
    metronomeBaseCost: 500,

    // Dynamic scaling for upgrades
    upgradeCostScaling: 0.05, // How much the multiplier increases per purchase
    
    // Platinum prestige system
    platinumPoints: 0,
    platinumMultiplier: 1,
    lifetimePlatinumPoints: 0,
    prestigeCount: 0,
    
    // Platinum upgrades
    platinumUpgrades: {
        fanRetention: 0,  // Keep a % of fans when prestiging
        earlyBird: 0,     // Start with some money and albums
        goldenTouch: 0,   // Increase all money gains
        fastLearner: 0,   // Increase XP gain
        hitMaker: 0,      // Increase album value
        tourManager: 0    // Better tour rewards
    },
    
    // Platinum upgrade costs and effects
    platinumUpgradeDefinitions: {
        fanRetention: {
            baseEffect: 0.05,  // 5% fans retained per level
            baseCost: 3,
            costMultiplier: 1.5
        },
        earlyBird: {
            baseEffect: 1,     // 1 album and $1000 per level
            baseCost: 2,
            costMultiplier: 2
        },
        goldenTouch: {
            baseEffect: 0.1,   // 10% more money per level
            baseCost: 5,
            costMultiplier: 1.8
        },
        fastLearner: {
            baseEffect: 0.15,  // 15% more XP per level
            baseCost: 4,
            costMultiplier: 1.7
        },
        hitMaker: {
            baseEffect: 0.2,   // 20% higher album value per level
            baseCost: 6,
            costMultiplier: 1.9
        },
        tourManager: {
            baseEffect: 0.25,  // 25% better tour rewards per level
            baseCost: 5,
            costMultiplier: 1.8
        }
    },
    
    // Enhanced genre system with pros and cons
    genreDefinitions: {
        "Folk": {
            multiplier: 1,
            albumCostModifier: 0.8,  // 20% cheaper albums
            xpModifier: 1.25,        // 25% more XP from practice
            salesRateModifier: 0.75, // 25% slower sales
            switchCost: 0            // Free (starting genre)
        },
        "Rock": {
            multiplier: 1.5,
            albumCostModifier: 1,
            xpModifier: 0.75,        // 25% less XP from practice  
            salesRateModifier: 1.5,  // 50% faster sales
            switchCost: 3            // Costs 3 albums to switch
        },
        "Pop": {
            multiplier: 2,
            albumCostModifier: 1.5,  // 50% more expensive albums
            xpModifier: 1,
            salesRateModifier: 2,    // Double sales rate
            switchCost: 5            // Costs 5 albums to switch
        },
        "Hip Hop": {
            multiplier: 3,
            albumCostModifier: 1.25,
            xpModifier: 1,
            salesRateModifier: 1.25,
            fameModifier: 2,         // Double fame gain
            switchCost: 8            // Costs 8 albums to switch
        },
        "Electronic": {
            multiplier: 4,
            albumCostModifier: 1.5,
            xpModifier: 0.5,         // Half XP from practice
            salesRateModifier: 3,    // Triple sales rate
            switchCost: 10           // Costs 10 albums to switch
        },
        "Classical": {
            multiplier: 5,
            albumCostModifier: 2,
            xpModifier: 1,
            salesRateModifier: 0.25, // 75% slower sales
            albumValueModifier: 4,   // 4x album value
            switchCost: 15           // Costs 15 albums to switch
        }
    },
    
    // Fusion genres (unlocked with keyboardist)
    fusionGenres: {
        "Jazz Fusion": {
            multiplier: 3.5,
            albumCostModifier: 1.5,
            xpModifier: 1.5,         // 50% more XP
            albumValueModifier: 2.5, // 2.5x album value
            salesRateModifier: 0.8,  // 20% slower sales
            switchCost: 20           // Costs 20 albums to switch
        },
        "Metal": {
            multiplier: 4.5,
            albumCostModifier: 2,
            xpModifier: 0.5,         // Half XP from practice
            salesRateModifier: 3,    // Triple sales rate
            fameModifier: 1.5,       // 50% more fame
            switchCost: 25           // Costs 25 albums to switch
        },
        "Experimental": {
            multiplier: 5.5,
            albumCostModifier: 3,
            xpModifier: 0.75,
            salesRateModifier: 0.2,  // 80% slower sales
            albumValueModifier: 4,   // 4x album value
            fameModifier: 3,         // 3x fame gain
            switchCost: 30           // Costs 30 albums to switch
        }
    }
};

// DOM elements
const domElements = {
    experience: document.getElementById('experience'),
    albums: document.getElementById('albums'),
    money: document.getElementById('money'),
    fame: document.getElementById('fame'),
    
    practiceBtn: document.getElementById('practice'),
    recordAlbumBtn: document.getElementById('record-album'),
    goOnTourBtn: document.getElementById('go-on-tour'),
    
    betterGuitarBtn: document.getElementById('better-guitar'),
    recordingEquipmentBtn: document.getElementById('recording-equipment'),
    marketingBtn: document.getElementById('marketing'),
    studioTimeBtn: document.getElementById('studio-time'),
    producerBtn: document.getElementById('producer'),
    
    xpPerPractice: document.getElementById('xp-per-practice'),
    albumValue: document.getElementById('album-value'),
    salesPerSecond: document.getElementById('sales-per-second'),
    totalAlbumsSold: document.getElementById('total-albums-sold'),
    
    collabContainer: document.getElementById('collab-container'),
    collabDescription: document.getElementById('collab-description'),
    acceptCollabBtn: document.getElementById('accept-collab'),
    declineCollabBtn: document.getElementById('decline-collab'),
    collabTimer: document.getElementById('collab-timer'),
    
    notifications: document.getElementById('notifications'),
    metronomeBtn: null,  // We'll create this dynamically
};

// Initialize the game
function init() {
    // Add event listeners
    domElements.practiceBtn.addEventListener('click', practice);
    domElements.recordAlbumBtn.addEventListener('click', recordAlbum);
    domElements.goOnTourBtn.addEventListener('click', goOnTour);
    
    domElements.betterGuitarBtn.addEventListener('click', () => buyUpgrade('betterGuitar'));
    domElements.recordingEquipmentBtn.addEventListener('click', () => buyUpgrade('recordingEquipment'));
    domElements.marketingBtn.addEventListener('click', () => buyUpgrade('marketing'));
    domElements.studioTimeBtn.addEventListener('click', () => buyUpgrade('studioTime'));
    domElements.producerBtn.addEventListener('click', () => buyUpgrade('producer'));
    
    domElements.acceptCollabBtn.addEventListener('click', acceptCollab);
    domElements.declineCollabBtn.addEventListener('click', declineCollab);
    
    // Add platinum styles
    addPlatinumStyles();
    
    // Set game loops
    game.gameLoopIntervalId = setInterval(gameLoop, 1000);
    game.autoSaveIntervalId = setInterval(saveGame, 30000);
    game.checkCollabIntervalId = setInterval(checkForCollabOpportunity, 60000);
    
    // Load saved game
    loadGame();
    
    // Apply platinum bonuses if any
    if (game.lifetimePlatinumPoints > 0) {
        applyPlatinumBonuses();
    }
    
    // Update UI
    updateUI();
    
    // Initialize band members system
    addBandMembersSystem();
    
    // Show welcome notification
    addNotification("Welcome to Musician Tycoon! Start by practicing your guitar skills.");
    
    // Add reset button
    addResetButton();

    // Initialize autoPracticeRate if it doesn't exist
    if (!game.autoPracticeRate) {
        game.autoPracticeRate = 1;
    }

    // Add metronome button to the store
    addMetronomeToStore();

    // Initialize collapsible sections
    initializeCollapsibleSections();

    // Fix specific store collapse issue
    fixStoreCollapse();
    
    // Fix store interactivity
    fixStoreInteractivity();
    
    // Initialize platinum shop earlier - once player has at least 1 album and some fame
    if (game.albums >= 1 && game.fame >= 100) {
        showPlatinumAvailability();
    }
    
    // Add "Make a post online" button to the actions section - Move this to the end of init to ensure all DOM elements exist
    setTimeout(() => {
        const makePostButton = document.getElementById('makePostButton');
        if (makePostButton) {
            console.log("Found Make Post button, attaching click handler");
            makePostButton.addEventListener('click', function() {
                console.log("Make Post button clicked");
                makePost();
            });
        } else {
            console.log("Make Post button not found in DOM");
        }
    }, 100); // Small delay to ensure DOM is fully loaded
}

// Game actions
function practice() {
    // Calculate base XP gain
    let xpGain = game.xpPerPractice;
    
    // Apply Fast Learner platinum upgrade if purchased
    if (game.platinumUpgrades.fastLearner > 0) {
        const fastLearnerBonus = 1 + (game.platinumUpgrades.fastLearner * 
                                game.platinumUpgradeDefinitions.fastLearner.baseEffect);
        xpGain *= fastLearnerBonus;
    }
    
    // Apply platinum multiplier to XP gain
    xpGain *= game.platinumMultiplier;
    
    // Add XP (rounded down to prevent weird fractional XP)
    game.experience += Math.floor(xpGain);
    
    // Check if this is the first time reaching enough XP for an album
    const canRecordAlbum = game.experience >= game.currentAlbumCost;
    if (canRecordAlbum && !domElements.recordAlbumBtn.classList.contains('can-record')) {
        addNotification("You've gained enough experience to record your first album!");
        domElements.recordAlbumBtn.classList.add('can-record');
    }
    
    // Always update UI at the end after all checks
    updateUI();
}

function recordAlbum() {
    if (game.experience >= game.currentAlbumCost) {
        game.experience -= game.currentAlbumCost;
        game.albums++;
        
        // Increase the cost for the next album
        game.currentAlbumCost = Math.floor(game.baseAlbumCost * Math.pow(game.albumCostMultiplier, game.albums));
        
        // Remove the can-record class since we need to save up again
        domElements.recordAlbumBtn.classList.remove('can-record');
        
        // Update other game systems
        updateSalesRate();
        
        // Check for milestones BEFORE updating UI
        if (game.albums >= 3 && !game.hasBetterGuitar && domElements.betterGuitarBtn.disabled) {
            // Only show notification that it's available, don't enable the button here
            // The updateUI function will handle enabling/disabling based on money
            addNotification("New in store: Better Guitar! Improve your practice efficiency.");
        }
        
        if (game.albums >= 5 && !game.hasRecordingEquipment && domElements.recordingEquipmentBtn.disabled) {
            // Only show notification that it's available, don't enable the button here
            addNotification("New in store: Recording Equipment! Increase the value of your albums.");
        }
        
        // Genre unlock checks
        checkGenreUnlocks();
        
        // Now update UI after notifications but before the album notification
        updateUI();
        checkTourRequirements();
        
        addNotification(`You've recorded album #${game.albums}!`);
    }
}

function goOnTour() {
    // Check if the player meets requirements without subtracting albums
    if (game.albums >= game.currentTourAlbumCost && 
        game.money >= game.currentTourMoneyCost && 
        game.upgradeCounts.producer > 0) {
        
        // Only subtract money, not albums (albums are just a requirement)
        game.money -= game.currentTourMoneyCost;
        game.tourLevel++;
        
        // Calculate base fame gain and tour profit
        let fameGain = 1000 * Math.pow(1.2, game.tourLevel - 1);
        
        // Calculate tour profit based on fame and tour level
        let tourProfit = 10000 * Math.sqrt(game.fame / 1000) * Math.pow(1.1, game.tourLevel - 1);
        
        // Apply Tour Manager platinum upgrade if purchased
        if (game.platinumUpgrades.tourManager > 0) {
            const tourManagerBonus = 1 + (game.platinumUpgrades.tourManager * 
                                    game.platinumUpgradeDefinitions.tourManager.baseEffect);
            fameGain *= tourManagerBonus;
            tourProfit *= tourManagerBonus;
        }
        
        // Apply platinum multiplier to all gains
        fameGain *= game.platinumMultiplier;
        tourProfit *= game.platinumMultiplier;
        
        // Add gains to player stats
        game.fame += fameGain;
        game.money += tourProfit;
        
        // Increase the cost for the next tour
        game.currentTourAlbumCost = Math.floor(game.baseTourAlbumCost * Math.pow(game.tourAlbumCostMultiplier, game.tourLevel));
        game.currentTourMoneyCost = Math.floor(game.baseTourMoneyCost * Math.pow(game.tourMoneyCostMultiplier, game.tourLevel));
        
        updateSalesRate();
        updateUI();
        
        // Explicitly check tour requirements after a tour is completed
        checkTourRequirements();
        
        addNotification(`You went on tour #${game.tourLevel} and gained ${Math.floor(fameGain)} fans! Tour profit: $${Math.floor(tourProfit)}`);
    }
}

// Store functions
function buyUpgrade(upgrade) {
    const currentCost = game.currentUpgradeCosts[upgrade];
    
    if (game.money >= currentCost) {
        game.money -= currentCost;
        game.upgradeCounts[upgrade]++;
        
        // Increase the cost multiplier slightly for this upgrade
        const newMultiplier = game.upgradeCostMultiplier + 
            (game.upgradeCostScaling * game.upgradeCounts[upgrade]);
        
        // Calculate new cost with the increased multiplier
        game.currentUpgradeCosts[upgrade] = Math.floor(
            game.upgradeCosts[upgrade] * Math.pow(newMultiplier, game.upgradeCounts[upgrade])
        );
        
        // Apply different effects based on the upgrade
        switch(upgrade) {
            case 'betterGuitar':
                game.xpPerPractice += 1;
                addNotification(`Guitar upgraded! Now you gain +${game.upgradeCounts[upgrade] + 1} XP per practice.`);
                break;
                
            case 'recordingEquipment':
                game.albumValue += 1;
                addNotification(`Recording equipment upgraded! Your albums are now worth $${game.albumValue} each.`);
                
                // Unlock marketing after first recording equipment purchase
                if (game.upgradeCounts[upgrade] === 1 && !game.hasMarketing) {
                    game.hasMarketing = false; // Make sure it's accessible
                    addNotification("New in store: Marketing Campaign! Increase your album sales rate.");
                }
                break;
                
            case 'marketing':
                game.salesMultiplier *= 1.25;
                addNotification(`Marketing upgraded! Your albums now sell ${Math.round((game.salesMultiplier - 1) * 100)}% faster.`);
                
                // Unlock studio time after first marketing purchase
                if (game.upgradeCounts[upgrade] === 1 && !game.hasStudioTime) {
                    game.hasStudioTime = false; // Make sure it's accessible
                    addNotification("New in store: Studio Time! Practice automatically once per second.");
                }
                break;
                
            case 'studioTime':
                // Increase auto-practice rate
                const oldRate = game.autoPracticeRate || 1;
                game.autoPracticeRate = oldRate * 1.5;
                
                // No longer need to start the interval - that's the metronome's job now
                if (game.upgradeCounts[upgrade] === 1) {
                    addNotification("You've rented studio time! Auto-practice efficiency increased by 50%.");
                    
                    // Unlock producer after first studio time purchase
                    if (!game.hasProducer) {
                        game.hasProducer = false; // Make sure it's accessible
                        addNotification("New in store: Producer! Double the value of your albums.");
                    }
                } else {
                    addNotification(`Studio time upgraded! Auto-practice is now ${Math.round(game.autoPracticeRate * 100)}% efficient.`);
                }
                break;
                
            case 'producer':
                game.albumValue *= 1.5;
                if (game.upgradeCounts[upgrade] === 1) {
                    game.hasProducer = true;
                    addNotification("You hired a producer! Album value increased by 50%.");
                    // Check tour requirements since purchasing a producer can enable touring
                    checkTourRequirements();
                } else {
                    addNotification(`Producer upgraded! Album value increased by another 50%.`);
                }
                break;
        }
        
        updateSalesRate();
        updateUI();
        
        // Update the UI with the new cost multiplier for this item
        addNotification(`Upgrade purchased! Next ${upgrade} will be more expensive.`);
    }
}

// Collaboration system
function checkForCollabOpportunity() {
    if (game.albums >= 3 && !game.isCollabActive && Math.random() < 0.3) {
        offerCollaboration();
    }
}

function offerCollaboration() {
    const artists = [
        "Taylor Swift", "Drake", "BTS", "The Weeknd", "Billie Eilish",
        "Post Malone", "Ariana Grande", "Ed Sheeran", "Justin Bieber", "Bad Bunny"
    ];
    
    const randomArtist = artists[Math.floor(Math.random() * artists.length)];
    const collabBoost = 1 + Math.random() * 2; // 1x to 3x boost
    
    showCollabOpportunity(randomArtist);
}

function showCollabOpportunity(artist) {
    game.collabTimeLeft = 30; // 30 seconds to decide
    
    domElements.collabDescription.textContent = `${artist} wants to collaborate on a new track! This will boost your sales by 2x for 60 seconds.`;
    domElements.collabContainer.classList.remove('hidden');
    
    // Play sound or flash effect could be added here
    // For now, we'll scroll to the top to ensure it's visible
    window.scrollTo({top: 0, behavior: 'smooth'});
    
    // Start the timer
    if (game.collabIntervalId) {
        clearInterval(game.collabIntervalId);
    }
    
    game.collabIntervalId = setInterval(() => {
        game.collabTimeLeft--;
        domElements.collabTimer.textContent = `Time left: ${game.collabTimeLeft}s`;
        
        if (game.collabTimeLeft <= 0) {
            declineCollab();
        }
    }, 1000);
}

function acceptCollab() {
    clearInterval(game.collabIntervalId);
    domElements.collabContainer.classList.add('hidden');
    
    game.isCollabActive = true;
    game.collabMultiplier = 2;
    updateSalesRate();
    
    addNotification(`You're now collaborating with ${artist}! Sales boosted by 2x for 60 seconds.`);
    
    // End collab after 60 seconds
    setTimeout(() => {
        game.isCollabActive = false;
        game.collabMultiplier = 1;
        updateSalesRate();
        addNotification(`Your collaboration with ${artist} has ended.`);
    }, 60000);
}

function declineCollab() {
    clearInterval(game.collabIntervalId);
    domElements.collabContainer.classList.add('hidden');
    game.pendingCollab = null;
}

// Game loop (runs every second)
function gameLoop() {
    if (game.albums > 0) {
        // Calculate album sales for this second
        const salesThisSecond = game.salesPerSecond;
        game.money += salesThisSecond;
        game.totalAlbumsSold += salesThisSecond / game.albumValue;
        
        // Increase fame based on sales
        game.fame += salesThisSecond / 100;
        
        updateUI();
        checkTourRequirements();
        
        // Enable tour button if conditions met
        if (game.albums >= 5 && game.money >= 5000 && game.upgradeCounts.producer > 0 && domElements.goOnTourBtn.disabled) {
            domElements.goOnTourBtn.disabled = false;
        }
    }
}

// Helper functions
function updateSalesRate() {
    // Base sales rate calculation
    let salesRate = game.albums * 0.1;
    
    // Apply multipliers from upgrades
    salesRate *= game.salesMultiplier;
    
    // Apply fan multiplier (1% per fan)
    const fanMultiplier = 1 + (game.fans / 100);
    salesRate *= fanMultiplier;
    
    // Set the sales rate
    game.salesPerSecond = salesRate;
    
    // Calculate fan gain
    let fanGainRate = salesRate * 0.05;
    
    // Apply social media boost (1% per level)
    const socialMediaBoost = 1 + (game.socialMediaLevel * 0.01);
    fanGainRate *= socialMediaBoost;
    
    // Add fans
    game.fans += fanGainRate;
    
    // Update money based on sales
    game.money += salesRate * game.albumValue;
    game.totalAlbumsSold += salesRate;
}

function addNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    domElements.notifications.prepend(notification);
    
    // Remove notification after 10 seconds
    setTimeout(() => {
        notification.remove();
    }, 10000);
}

function updateUI() {
    // Update resource displays
    domElements.experience.textContent = Math.floor(game.experience);
    domElements.albums.textContent = game.albums;
    domElements.money.textContent = Math.floor(game.money);
    domElements.fame.textContent = Math.floor(game.fame);
    
    // Update stats
    domElements.xpPerPractice.textContent = game.xpPerPractice;
    domElements.albumValue.textContent = game.albumValue;
    domElements.salesPerSecond.textContent = game.salesPerSecond.toFixed(2);
    domElements.totalAlbumsSold.textContent = Math.floor(game.totalAlbumsSold);
    
    // Use consistent approach for all button states
    const canRecordAlbum = game.experience >= game.currentAlbumCost;
    domElements.recordAlbumBtn.disabled = !canRecordAlbum;
    
    const canGoOnTour = game.albums >= game.currentTourAlbumCost && 
                        game.money >= game.currentTourMoneyCost && 
                        game.upgradeCounts.producer > 0;
    domElements.goOnTourBtn.disabled = !canGoOnTour;
    
    // Add or remove can-tour class based on whether ALL requirements are met
    if (canGoOnTour && !domElements.goOnTourBtn.classList.contains('can-tour')) {
        domElements.goOnTourBtn.classList.add('can-tour');
    } else if (!canGoOnTour && domElements.goOnTourBtn.classList.contains('can-tour')) {
        domElements.goOnTourBtn.classList.remove('can-tour');
    }
    
    // Also update the button text to show current costs
    domElements.goOnTourBtn.innerHTML = `Go on Tour (${game.currentTourAlbumCost} Albums & $${game.currentTourMoneyCost.toLocaleString()})`;
    
    // Update store buttons with current costs and descriptions
    updateStoreButtons();
    
    // Add current genre display
    document.getElementById('current-genre').textContent = game.currentGenre;

    // Update band member buttons if they exist
    updateBandMemberButtons();

    // Update metronome button if it exists
    if (domElements.metronomeBtn) {
        if (game.hasMetronome) {
            domElements.metronomeBtn.disabled = true;
            domElements.metronomeBtn.innerHTML = `
                Metronome <span class="sold-out">SOLD OUT</span> <br>
                <small>Auto-practice enabled (${game.xpPerPractice} XP/second)</small>
            `;
        } else {
            domElements.metronomeBtn.disabled = game.money < game.metronomeBaseCost;
            domElements.metronomeBtn.innerHTML = `
                Metronome ($${game.metronomeBaseCost}) <br>
                <small>Enables auto-practice (1 XP/second)</small>
            `;
        }
    }

    // Update genres
    updateGenres();
    
    // Check and update platinum availability
    // Show platinum section much earlier - once player has at least 1 album and some fame
    if (game.albums >= 1 && game.fame >= 100) {
        showPlatinumAvailability();
    }
    
    // Update social media button state
    const makePostButton = document.getElementById('makePostButton');
    if (makePostButton) {
        makePostButton.innerHTML = `Make a post online (${Math.floor(game.socialMediaCost)} XP)`;
        makePostButton.disabled = game.experience < game.socialMediaCost;
        makePostButton.title = `Current level: ${game.socialMediaLevel}\nFan gain boost: +${game.socialMediaLevel}%`;
        
        // Ensure proper styling for the button
        if (game.experience < game.socialMediaCost) {
            makePostButton.classList.add('disabled');
        } else {
            makePostButton.classList.remove('disabled');
        }
        
        // Re-attach click handler to ensure it works
        makePostButton.onclick = makePost;
    }
    
    // Update stats display to include social media info
    const statsContainer = document.getElementById('stats');
    if (statsContainer) {
        // ... existing code ...
        
        // Add or update social media info in stats
        const socialMediaInfo = document.getElementById('socialMediaInfo') || document.createElement('p');
        socialMediaInfo.id = 'socialMediaInfo';
        socialMediaInfo.innerHTML = `Social Media Level: ${game.socialMediaLevel} (+${game.socialMediaLevel}% fan gain)`;
        if (!document.getElementById('socialMediaInfo')) {
            statsContainer.appendChild(socialMediaInfo);
        }
    }
}

// Add method to check tour requirements after various actions
function checkTourRequirements() {
    const canGoOnTour = game.albums >= game.currentTourAlbumCost && 
                        game.money >= game.currentTourMoneyCost && 
                        game.upgradeCounts.producer > 0;
                        
    // Update both the CSS class and the disabled property
    domElements.goOnTourBtn.disabled = !canGoOnTour;
    
    if (canGoOnTour && !domElements.goOnTourBtn.classList.contains('can-tour')) {
        domElements.goOnTourBtn.classList.add('can-tour');
        addNotification("You can now go on tour!");
    } else if (!canGoOnTour && domElements.goOnTourBtn.classList.contains('can-tour')) {
        domElements.goOnTourBtn.classList.remove('can-tour');
    }
}

// Save and load functions
function saveGame() {
    const gameData = JSON.stringify(game);
    localStorage.setItem('musicianTycoonSave', gameData);
    addNotification("Game saved!");
}

function loadGame() {
    const savedGame = localStorage.getItem('musicianTycoonSave');
    
    if (savedGame) {
        const loadedGame = JSON.parse(savedGame);
        Object.assign(game, loadedGame);
        
        // Reinitialize auto-practice if metronome is owned
        if (game.hasMetronome) {
            startAutoPractice();
        }
        
        updateSalesRate();
        addNotification("Game loaded successfully!");
    }
}

// Add a new function to check if new genres should be unlocked
function checkGenreUnlocks() {
    for (const genre in game.genreUnlockCosts) {
        if (!game.unlockedGenres.includes(genre) && game.albums >= game.genreUnlockCosts[genre]) {
            game.unlockedGenres.push(genre);
            addNotification(`You've unlocked the ${genre} genre! Switch to it for better album sales.`);
            
            // Add a new genre button to the UI
            addGenreButton(genre);
        }
    }
}

// Function to add a new genre button
function addGenreButton(genre) {
    const genreSection = document.createElement('div');
    genreSection.className = 'genre-item';
    
    const genreBtn = document.createElement('button');
    genreBtn.className = 'genre-btn';
    genreBtn.textContent = `Switch to ${genre}`;
    genreBtn.addEventListener('click', () => switchGenre(genre));
    
    genreSection.appendChild(genreBtn);
    document.querySelector('.genres-container').appendChild(genreSection);
}

// Function to switch genres
function switchGenre(genre) {
    // Check if genre is already active
    if (genre === game.currentGenre) {
        addNotification(`You're already playing ${genre} music!`);
        return;
    }
    
    // Get genre data
    const genreData = game.genreDefinitions[genre] || game.fusionGenres[genre];
    if (!genreData) return;
    
    // Check if player has enough albums to switch
    if (game.albums < genreData.switchCost) {
        addNotification(`You need at least ${genreData.switchCost} albums to switch to ${genre}!`);
        return;
    }
    
    // Confirm switch with the player
    const oldGenre = game.currentGenre;
    const albumCost = genreData.switchCost;
    
    if (confirm(`Switching to ${genre} will cost you ${albumCost} albums and change your abilities:
    
${getGenreTradeoffsText(genre)}

Are you sure you want to switch?`)) {
        // Apply the cost
        game.albums -= albumCost;
        
        // Switch genre
        game.currentGenre = genre;
        
        // Apply new genre effects
        applyGenreEffects();
        
        // Update UI
        updateGenreButtons();
        updateUI();
        
        addNotification(`You've switched to ${genre} music! You sacrificed ${albumCost} albums to change your musical direction.`);
    }
}

// Add helper function to apply genre effects
function applyGenreEffects() {
    // Get current genre data
    const genreData = game.genreDefinitions[game.currentGenre] || game.fusionGenres[game.currentGenre];
    if (!genreData) return;
    
    // Apply album cost modifier (affects next album cost calculation)
    const baseAlbumCost = game.baseAlbumCost;
    game.currentAlbumCost = Math.floor(baseAlbumCost * genreData.albumCostModifier * 
                                     Math.pow(game.albumCostMultiplier, game.albums));
    
    // Update sales rate to account for genre effects
    updateSalesRate();
}

// Helper to get human-readable text about genre trade-offs
function getGenreTradeoffsText(genre) {
    const genreData = game.genreDefinitions[genre] || game.fusionGenres[genre];
    if (!genreData) return "";
    
    let tradeoffs = [];
    
    if (genreData.albumCostModifier !== 1) {
        const percent = Math.abs((genreData.albumCostModifier - 1) * 100);
        tradeoffs.push(`Albums ${genreData.albumCostModifier > 1 ? 'cost' : 'cost'} ${percent}% ${genreData.albumCostModifier > 1 ? 'more' : 'less'} to record`);
    }
    
    if (genreData.xpModifier !== 1) {
        const percent = Math.abs((genreData.xpModifier - 1) * 100);
        tradeoffs.push(`Practice gives ${percent}% ${genreData.xpModifier > 1 ? 'more' : 'less'} XP`);
    }
    
    if (genreData.salesRateModifier !== 1) {
        const percent = Math.abs((genreData.salesRateModifier - 1) * 100);
        tradeoffs.push(`Albums sell ${percent}% ${genreData.salesRateModifier > 1 ? 'faster' : 'slower'}`);
    }
    
    if (genreData.albumValueModifier && genreData.albumValueModifier !== 1) {
        const percent = Math.abs((genreData.albumValueModifier - 1) * 100);
        tradeoffs.push(`Albums worth ${percent}% ${genreData.albumValueModifier > 1 ? 'more' : 'less'}`);
    }
    
    if (genreData.fameModifier && genreData.fameModifier !== 1) {
        const percent = Math.abs((genreData.fameModifier - 1) * 100);
        tradeoffs.push(`Gain ${percent}% ${genreData.fameModifier > 1 ? 'more' : 'less'} fame`);
    }
    
    return tradeoffs.join('\n');
}

// Add function to create band members that boost different aspects of the game
function addBandMembersSystem() {
    // Add a new section to the HTML for band members
    const bandMembersSection = document.createElement('div');
    bandMembersSection.className = 'band-members';
    bandMembersSection.innerHTML = `
        <h2>Band Members</h2>
        <p>Hire musicians to help your career.</p>
        <div class="band-members-container">
            <div class="band-member-item">
                <button id="hire-drummer" class="band-btn ${game.hasDrummer ? 'hired' : ''}" ${game.hasDrummer ? 'disabled' : ''}>
                    Hire Drummer ($2000) <br>
                    <small>+50% practice efficiency</small>
                </button>
            </div>
            <div class="band-member-item">
                <button id="hire-bassist" class="band-btn ${game.hasBassist ? 'hired' : ''}" ${game.hasBassist ? 'disabled' : ''}>
                    Hire Bassist ($5000) <br>
                    <small>+25% album value</small>
                </button>
            </div>
            <div class="band-member-item">
                <button id="hire-keyboardist" class="band-btn ${game.hasKeyboardist ? 'hired' : ''}" ${game.hasKeyboardist ? 'disabled' : ''}>
                    Hire Keyboardist ($10000) <br>
                    <small>Unlock new genre combinations</small>
                </button>
            </div>
        </div>
    `;
    
    document.querySelector('.left-column').appendChild(bandMembersSection);
    
    // Add event listeners
    document.getElementById('hire-drummer').addEventListener('click', hireDrummer);
    document.getElementById('hire-bassist').addEventListener('click', hireBassist);
    document.getElementById('hire-keyboardist').addEventListener('click', hireKeyboardist);
    
    // Update button states initially
    updateBandMemberButtons();
}

// Add functions for each band member
function hireDrummer() {
    if (game.money >= 2000 && !game.hasDrummer) {
        game.money -= 2000;
        game.hasDrummer = true;
        game.xpPerPractice *= 1.5; // 50% increase in practice efficiency
        
        const drummerBtn = document.getElementById('hire-drummer');
        drummerBtn.disabled = true;
        drummerBtn.classList.add('hired');  // Add the hired class
        
        updateUI();
        addNotification("You hired a drummer! Practice efficiency increased by 50%.");
    }
}

function hireBassist() {
    if (game.money >= 5000 && !game.hasBassist) {
        game.money -= 5000;
        game.hasBassist = true;
        game.albumValue *= 1.25; // 25% increase in album value
        
        const bassistBtn = document.getElementById('hire-bassist');
        bassistBtn.disabled = true;
        bassistBtn.classList.add('hired');  // Add the hired class
        
        updateSalesRate();
        updateUI();
        addNotification("You hired a bassist! Album value increased by 25%.");
    }
}

function hireKeyboardist() {
    if (game.money >= 10000 && !game.hasKeyboardist) {
        game.money -= 10000;
        game.hasKeyboardist = true;
        
        const keyboardistBtn = document.getElementById('hire-keyboardist');
        keyboardistBtn.disabled = true;
        keyboardistBtn.classList.add('hired');  // Add the hired class
        
        // Unlock fusion genres
        addFusionGenres();
        updateUI();
        addNotification("You hired a keyboardist! New genre combinations unlocked.");
    }
}

// Function to add fusion genres
function addFusionGenres() {
    const fusionGenres = {
        "Jazz Fusion": {
            multiplier: 3.5,
            albumCostModifier: 1.5,
            xpModifier: 1.5,         // 50% more XP
            albumValueModifier: 2.5, // 2.5x album value
            salesRateModifier: 0.8,  // 20% slower sales
            switchCost: 20           // Costs 20 albums to switch
        },
        "Metal": {
            multiplier: 4.5,
            albumCostModifier: 2,
            xpModifier: 0.5,         // Half XP from practice
            salesRateModifier: 3,    // Triple sales rate
            fameModifier: 1.5,       // 50% more fame
            switchCost: 25           // Costs 25 albums to switch
        },
        "Experimental": {
            multiplier: 5.5,
            albumCostModifier: 3,
            xpModifier: 0.75,
            salesRateModifier: 0.2,  // 80% slower sales
            albumValueModifier: 4,   // 4x album value
            fameModifier: 3,         // 3x fame gain
            switchCost: 30           // Costs 30 albums to switch
        }
    };
    
    // Add fusion genres to multipliers and unlock them
    for (const genre in fusionGenres) {
        game.genreMultipliers[genre] = fusionGenres[genre];
        if (!game.unlockedGenres.includes(genre)) {
            game.unlockedGenres.push(genre);
            addGenreButton(genre);
        }
    }
}

// Function to update band member buttons
function updateBandMemberButtons() {
    if (document.getElementById('hire-drummer')) {
        const drummerBtn = document.getElementById('hire-drummer');
        drummerBtn.disabled = game.hasDrummer || game.money < 2000;
        if (game.hasDrummer) {
            drummerBtn.classList.add('hired');
        } else {
            drummerBtn.classList.remove('hired');
        }
    }
    
    if (document.getElementById('hire-bassist')) {
        const bassistBtn = document.getElementById('hire-bassist');
        bassistBtn.disabled = game.hasBassist || game.money < 5000;
        if (game.hasBassist) {
            bassistBtn.classList.add('hired');
        } else {
            bassistBtn.classList.remove('hired');
        }
    }
    
    if (document.getElementById('hire-keyboardist')) {
        const keyboardistBtn = document.getElementById('hire-keyboardist');
        keyboardistBtn.disabled = game.hasKeyboardist || game.money < 10000;
        if (game.hasKeyboardist) {
            keyboardistBtn.classList.add('hired');
        } else {
            keyboardistBtn.classList.remove('hired');
        }
    }
}

// Add a function to create the reset button
function addResetButton() {
    const resetButtonContainer = document.createElement('div');
    resetButtonContainer.className = 'reset-container';
    
    const resetButton = document.createElement('button');
    resetButton.id = 'reset-game';
    resetButton.className = 'reset-btn';
    resetButton.textContent = 'Reset Game';
    resetButton.addEventListener('click', resetGame);
    
    resetButtonContainer.appendChild(resetButton);
    document.querySelector('.container').appendChild(resetButtonContainer);
}

// Add a function to reset the game
function resetGame() {
    if (confirm('Are you sure you want to reset the game? All progress will be lost!')) {
        // Clear local storage
        localStorage.removeItem('musicianTycoonSave');
        
        // Clear intervals
        clearInterval(game.gameLoopIntervalId);
        clearInterval(game.autoSaveIntervalId);
        clearInterval(game.checkCollabIntervalId);
        if (game.autoPracticeIntervalId) {
            clearInterval(game.autoPracticeIntervalId);
        }
        if (game.collabIntervalId) {
            clearInterval(game.collabIntervalId);
        }
        
        // Reset game state
        Object.assign(game, {
            experience: 0,
            albums: 0,
            money: 0,
            fame: 0,
            fans: 0,
            totalAlbumsSold: 0,
            socialMediaLevel: 0,
            socialMediaCost: 100,
            xpPerPractice: 1,
            albumValue: 5,
            salesPerSecond: 0,
            salesMultiplier: 1,
            hasBetterGuitar: false,
            hasRecordingEquipment: false,
            hasMarketing: false,
            hasStudioTime: false,
            hasProducer: false,
            isCollabActive: false,
            collabMultiplier: 1,
            collabTimeLeft: 0,
            collabIntervalId: null,
            baseAlbumCost: 100,
            albumCostMultiplier: 1.5,
            currentAlbumCost: 100,
            currentGenre: "Folk",
            unlockedGenres: ["Folk"],
            tourLevel: 0,
            baseTourAlbumCost: 5,
            tourAlbumCostMultiplier: 1.3,
            currentTourAlbumCost: 5,
            baseTourMoneyCost: 5000,
            tourMoneyCostMultiplier: 1.5,
            currentTourMoneyCost: 5000,
            hasDrummer: false,
            hasBassist: false,
            hasKeyboardist: false,
            upgradeCounts: {
                betterGuitar: 0,
                recordingEquipment: 0,
                marketing: 0,
                studioTime: 0,
                producer: 0
            },
            upgradeCosts: {
                betterGuitar: 50,
                recordingEquipment: 200,
                marketing: 500,
                studioTime: 1000,
                producer: 3000
            },
            currentUpgradeCosts: {
                betterGuitar: 50,
                recordingEquipment: 200,
                marketing: 500,
                studioTime: 1000,
                producer: 3000
            },
            upgradeCostMultiplier: 1.8,
            autoPracticeRate: 1,
            hasMetronome: false
        });
        
        // Restart intervals
        game.gameLoopIntervalId = setInterval(gameLoop, 1000);
        game.autoSaveIntervalId = setInterval(saveGame, 30000);
        game.checkCollabIntervalId = setInterval(checkForCollabOpportunity, 60000);
        
        // Clear DOM elements
        document.querySelector('.genres-container').innerHTML = `
            <div class="genre-item">
                <button class="genre-btn active">Folk (Default)</button>
            </div>
        `;
        
        // Remove band members section if it exists
        const bandMembers = document.querySelector('.band-members');
        if (bandMembers) {
            bandMembers.remove();
        }
        
        // Re-initialize band members
        addBandMembersSystem();
        
        // Update UI
        updateUI();
        
        addNotification("Game has been reset!");

        // Re-add metronome to store
        const oldMetronomeItem = document.getElementById('metronome-item');
        if (oldMetronomeItem) {
            oldMetronomeItem.remove();
        }
        addMetronomeToStore();
    }
}

// Function to add the metronome to the store
function addMetronomeToStore() {
    // Create metronome button element
    const metronomeItem = document.createElement('div');
    metronomeItem.className = 'upgrade-item';
    metronomeItem.id = 'metronome-item';
    
    const metronomeBtn = document.createElement('button');
    metronomeBtn.id = 'metronome';
    metronomeBtn.className = 'store-btn';
    metronomeBtn.disabled = game.hasMetronome || game.money < game.metronomeBaseCost;
    metronomeBtn.innerHTML = `
        Metronome ($${game.metronomeBaseCost}) <br>
        <small>Enables auto-practice (1 XP/second)</small>
    `;
    
    metronomeBtn.addEventListener('click', buyMetronome);
    metronomeItem.appendChild(metronomeBtn);
    
    // Insert it BEFORE the better guitar button instead of after
    const betterGuitarItem = document.getElementById('better-guitar').closest('.upgrade-item');
    betterGuitarItem.parentNode.insertBefore(metronomeItem, betterGuitarItem);
    
    // Save reference to the button
    domElements.metronomeBtn = metronomeBtn;
}

// Function to handle buying a metronome
function buyMetronome() {
    if (game.money >= game.metronomeBaseCost && !game.hasMetronome) {
        game.money -= game.metronomeBaseCost;
        game.hasMetronome = true;
        
        // Start auto-practice
        startAutoPractice();
        
        // Update button state
        if (domElements.metronomeBtn) {
            domElements.metronomeBtn.disabled = true;
            domElements.metronomeBtn.innerHTML = `
                Metronome <span class="sold-out">SOLD OUT</span> <br>
                <small>Auto-practice enabled (${game.xpPerPractice} XP/second)</small>
            `;
        }
        
        updateUI();
        addNotification("You purchased a metronome! You now practice automatically at a rate of 1 XP per second.");
    }
}

// Add a function to calculate platinum points based on fame
function calculatePlatinumPoints() {
    // Base formula: square root of fame, divided by 100, rounded down
    // This means 10,000 fans = 1 platinum point, 40,000 fans = 2 points, 90,000 fans = 3 points, etc.
    // The square root ensures diminishing returns but still rewards higher fame
    const basePoints = Math.floor(Math.sqrt(game.fame) / 10);
    
    // Apply a bonus based on number of albums produced and tour level
    // This encourages players to do more than just accumulate fans
    const albumsBonus = Math.floor(game.albums / 50);
    const tourBonus = game.tourLevel;
    
    // Minimum of 1 point if you have at least some fame
    return Math.max(1, basePoints + albumsBonus + tourBonus);
}

// Function to show platinum availability
function showPlatinumAvailability() {
    // Create the platinum section if it doesn't exist
    let platinumSection = document.getElementById('platinum-section');
    
    if (!platinumSection) {
        // Create the section
        platinumSection = document.createElement('div');
        platinumSection.id = 'platinum-section';
        platinumSection.className = 'platinum-section';
        
        // Add heading and description
        platinumSection.innerHTML = `
            <div class="section-header">
                <h2>Platinum Records</h2>
                <button class="toggle-btn">▼</button>
            </div>
            <div class="section-content">
                <p class="platinum-description">Go Platinum to reset your career but earn permanent benefits!</p>
                <div class="platinum-info">
                    <p>Current Platinum Points: <span id="platinum-points">0</span></p>
                    <p>Lifetime Platinum Points: <span id="lifetime-platinum">0</span></p>
                    <p>Platinum Multiplier: <span id="platinum-multiplier">1x</span></p>
                </div>
                <div class="platinum-actions">
                    <button id="go-platinum" class="platinum-btn">Go Platinum (Earn <span id="potential-platinum">0</span> Points)</button>
                    <button id="open-platinum-shop" class="platinum-shop-btn">Platinum Shop</button>
                </div>
                <div id="platinum-shop" class="platinum-shop hidden"></div>
            </div>
        `;
        
        // Find the best place to insert the platinum section
        let inserted = false;
        
        // Try inserting after stats section
        const statsSection = document.getElementById('stats-section');
        if (statsSection) {
            statsSection.parentNode.insertBefore(platinumSection, statsSection.nextSibling);
            inserted = true;
        }
        
        // Try inserting after band members if stats not found
        if (!inserted) {
            const bandMembers = document.querySelector('.band-members');
            if (bandMembers) {
                bandMembers.parentNode.insertBefore(platinumSection, bandMembers.nextSibling);
                inserted = true;
            }
        }
        
        // Try inserting before the store section
        if (!inserted) {
            const storeSection = document.getElementById('store-section');
            if (storeSection) {
                storeSection.parentNode.insertBefore(platinumSection, storeSection);
                inserted = true;
            }
        }
        
        // Last resort - just append it to the main container or body
        if (!inserted) {
            const container = document.querySelector('.container') || document.querySelector('main') || document.body;
            container.appendChild(platinumSection);
        }
        
        // Create a direct link to the platinum section
        const linkContainer = document.createElement('div');
        linkContainer.className = 'platinum-link-container';
        linkContainer.innerHTML = `
            <button id="platinum-quick-link" class="platinum-quick-link">
                Platinum Records
            </button>
        `;
        
        // Insert the link at the top of the page
        const firstElement = document.querySelector('.container') || document.querySelector('main') || document.body.firstChild;
        document.body.insertBefore(linkContainer, firstElement);
        
        // Add listener to the link
        document.getElementById('platinum-quick-link').addEventListener('click', () => {
            platinumSection.scrollIntoView({ behavior: 'smooth' });
            
            // Highlight the section briefly
            platinumSection.classList.add('highlight');
            setTimeout(() => {
                platinumSection.classList.remove('highlight');
            }, 1500);
        });
        
        // Add additional style for the link and highlight
        const linkStyle = document.createElement('style');
        linkStyle.textContent = `
            .platinum-link-container {
                position: fixed;
                top: 10px;
                right: 10px;
                z-index: 1000;
            }
            .platinum-quick-link {
                background-color: #FFD700;
                color: #333;
                padding: 5px 10px;
                border-radius: 4px;
                border: none;
                cursor: pointer;
                font-weight: bold;
                box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            }
            .platinum-quick-link:hover {
                background-color: #FFC125;
            }
            .highlight {
                animation: highlight-pulse 1.5s;
            }
            @keyframes highlight-pulse {
                0% { box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.7); }
                70% { box-shadow: 0 0 0 15px rgba(255, 215, 0, 0); }
                100% { box-shadow: 0 0 0 0 rgba(255, 215, 0, 0); }
            }
        `;
        document.head.appendChild(linkStyle);
        
        // Add event listeners
        document.getElementById('go-platinum').addEventListener('click', goPlatinum);
        document.getElementById('open-platinum-shop').addEventListener('click', togglePlatinumShop);
        
        // Make section collapsible
        const headerElement = platinumSection.querySelector('.section-header');
        const contentElement = platinumSection.querySelector('.section-content');
        const toggleBtn = headerElement.querySelector('.toggle-btn');
        
        headerElement.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON' && e.target !== toggleBtn) return;
            
            const isCurrentlyExpanded = !platinumSection.classList.contains('collapsed');
            contentElement.style.display = isCurrentlyExpanded ? 'none' : 'block';
            toggleBtn.textContent = isCurrentlyExpanded ? '►' : '▼';
            platinumSection.classList.toggle('collapsed', isCurrentlyExpanded);
            
            localStorage.setItem('platinum-section-expanded', !isCurrentlyExpanded);
        });
        
        // Initialize based on saved preference
        const isExpanded = localStorage.getItem('platinum-section-expanded') !== 'false';
        if (!isExpanded) {
            contentElement.style.display = 'none';
            toggleBtn.textContent = '►';
            platinumSection.classList.add('collapsed');
        }
    }
    
    // Update the potential platinum points display
    const potentialPoints = calculatePlatinumPoints();
    const potentialPlatinumElement = document.getElementById('potential-platinum');
    if (potentialPlatinumElement) {
        potentialPlatinumElement.textContent = potentialPoints;
    }
    
    // Update other platinum info
    const platinumPointsElement = document.getElementById('platinum-points');
    if (platinumPointsElement) {
        platinumPointsElement.textContent = game.platinumPoints;
    }
    
    const lifetimePlatinumElement = document.getElementById('lifetime-platinum');
    if (lifetimePlatinumElement) {
        lifetimePlatinumElement.textContent = game.lifetimePlatinumPoints;
    }
    
    const platinumMultiplierElement = document.getElementById('platinum-multiplier');
    if (platinumMultiplierElement) {
        platinumMultiplierElement.textContent = game.platinumMultiplier.toFixed(2) + 'x';
    }
    
    // Disable the platinum button if fame is too low
    const goPlatinumBtn = document.getElementById('go-platinum');
    if (goPlatinumBtn) {
        goPlatinumBtn.disabled = game.fame < 10000; // Need at least 10,000 fans to go platinum
        
        if (game.fame < 10000) {
            goPlatinumBtn.innerHTML = `Go Platinum (Need 10,000 fans)`;
        } else {
            goPlatinumBtn.innerHTML = `Go Platinum (Earn <span id="potential-platinum">${potentialPoints}</span> Points)`;
        }
    }
}

// Function to go platinum (prestige)
function goPlatinum() {
    // Need at least 10,000 fans to go platinum
    if (game.fame < 10000) {
        addNotification("You need at least 10,000 fans to go platinum!");
        return;
    }
    
    // Confirm with the player
    const pointsToEarn = calculatePlatinumPoints();
    if (!confirm(`Are you sure you want to Go Platinum? 
    
You'll reset your career but earn ${pointsToEarn} Platinum Points!

Your current stats:
- Fans: ${Math.floor(game.fame).toLocaleString()}
- Albums: ${game.albums}
- Money: $${Math.floor(game.money).toLocaleString()}
- Tour Level: ${game.tourLevel}

All progress except Platinum upgrades will be lost!`)) {
        return;
    }
    
    // Award platinum points
    const pointsEarned = calculatePlatinumPoints();
    game.platinumPoints += pointsEarned;
    game.lifetimePlatinumPoints += pointsEarned;
    game.prestigeCount++;
    
    // Calculate any fans to retain from the Fan Retention upgrade
    let fansToRetain = 0;
    if (game.platinumUpgrades.fanRetention > 0) {
        const retentionRate = game.platinumUpgrades.fanRetention * 
                              game.platinumUpgradeDefinitions.fanRetention.baseEffect;
        fansToRetain = Math.floor(game.fame * retentionRate);
    }
    
    // Save some values for restoration
    const platinumPoints = game.platinumPoints;
    const lifetimePlatinum = game.lifetimePlatinumPoints;
    const prestigeCount = game.prestigeCount;
    const platinumUpgrades = { ...game.platinumUpgrades };
    
    // Reset game state
    resetGameCore();
    
    // Restore platinum values
    game.platinumPoints = platinumPoints;
    game.lifetimePlatinumPoints = lifetimePlatinum;
    game.prestigeCount = prestigeCount;
    game.platinumUpgrades = platinumUpgrades;
    game.fame = fansToRetain;
    
    // Apply any "early bird" bonuses
    if (game.platinumUpgrades.earlyBird > 0) {
        const bonus = game.platinumUpgrades.earlyBird;
        game.albums += bonus;
        game.money += 1000 * bonus;
    }
    
    // Calculate new platinum multiplier based on lifetime points
    game.platinumMultiplier = 1 + (game.lifetimePlatinumPoints * 0.05); // +5% per lifetime point
    
    // Apply the multiplier to base stats
    applyPlatinumBonuses();
    
    // Update UI
    updateUI();
    initializePlatinumShop();
    
    addNotification(`You've gone Platinum! Earned ${pointsEarned} Platinum Points. Your career has been reset with permanent bonuses!`);
}

// Function to apply platinum bonuses to stats
function applyPlatinumBonuses() {
    // Apply multipliers from platinum upgrades
    const goldenTouchBonus = 1 + (game.platinumUpgrades.goldenTouch * 
                             game.platinumUpgradeDefinitions.goldenTouch.baseEffect);
    
    const fastLearnerBonus = 1 + (game.platinumUpgrades.fastLearner * 
                             game.platinumUpgradeDefinitions.fastLearner.baseEffect);
    
    const hitMakerBonus = 1 + (game.platinumUpgrades.hitMaker * 
                           game.platinumUpgradeDefinitions.hitMaker.baseEffect);
    
    // Apply to base stats
    game.xpPerPractice = Math.max(1, Math.floor(game.xpPerPractice * fastLearnerBonus));
    game.albumValue = Math.max(5, Math.floor(game.albumValue * hitMakerBonus));
    
    // Money multiplier is applied in updateSalesRate
}

// Function to reset the core game without touching platinum
function resetGameCore() {
    // Clear intervals
    clearInterval(game.gameLoopIntervalId);
    clearInterval(game.autoSaveIntervalId);
    clearInterval(game.checkCollabIntervalId);
    if (game.autoPracticeIntervalId) {
        clearInterval(game.autoPracticeIntervalId);
    }
    if (game.collabIntervalId) {
        clearInterval(game.collabIntervalId);
    }
    
    // Reset game state - keep only platinum-related properties
    const tempProps = {
        platinumPoints: game.platinumPoints,
        lifetimePlatinumPoints: game.lifetimePlatinumPoints,
        prestigeCount: game.prestigeCount,
        platinumUpgrades: {...game.platinumUpgrades},
        platinumMultiplier: game.platinumMultiplier,
        platinumUpgradeDefinitions: {...game.platinumUpgradeDefinitions}
    };
    
    // Reset to initial values
    Object.assign(game, {
        experience: 0,
        albums: 0,
        money: 0,
        fame: 0,
        fans: 0,
        totalAlbumsSold: 0,
        socialMediaLevel: 0,
        socialMediaCost: 100,
        xpPerPractice: 1,
        albumValue: 5,
        salesPerSecond: 0,
        salesMultiplier: 1,
        hasBetterGuitar: false,
        hasRecordingEquipment: false,
        hasMarketing: false,
        hasStudioTime: false,
        hasProducer: false,
        isCollabActive: false,
        collabMultiplier: 1,
        collabTimeLeft: 0,
        collabIntervalId: null,
        baseAlbumCost: 100,
        albumCostMultiplier: 1.5,
        currentAlbumCost: 100,
        currentGenre: "Folk",
        unlockedGenres: ["Folk"],
        tourLevel: 0,
        baseTourAlbumCost: 5,
        tourAlbumCostMultiplier: 1.3,
        currentTourAlbumCost: 5,
        baseTourMoneyCost: 5000,
        tourMoneyCostMultiplier: 1.5,
        currentTourMoneyCost: 5000,
        hasDrummer: false,
        hasBassist: false,
        hasKeyboardist: false,
        upgradeCounts: {
            betterGuitar: 0,
            recordingEquipment: 0,
            marketing: 0,
            studioTime: 0,
            producer: 0
        },
        currentUpgradeCosts: {
            betterGuitar: 50,
            recordingEquipment: 200,
            marketing: 500,
            studioTime: 1000,
            producer: 3000
        },
        autoPracticeRate: 1,
        hasMetronome: false
    });
    
    // Restore platinum properties
    Object.assign(game, tempProps);
    
    // Restart intervals
    game.gameLoopIntervalId = setInterval(gameLoop, 1000);
    game.autoSaveIntervalId = setInterval(saveGame, 30000);
    game.checkCollabIntervalId = setInterval(checkForCollabOpportunity, 60000);
    
    // Clear DOM elements
    document.querySelector('.genres-container').innerHTML = `
        <div class="genre-item">
            <button class="genre-btn active">Folk (Default)</button>
        </div>
    `;
    
    // Re-initialize UI components
    updateUI();
}

// Toggle platinum shop visibility
function togglePlatinumShop() {
    const platinumShop = document.getElementById('platinum-shop');
    if (platinumShop.classList.contains('hidden')) {
        platinumShop.classList.remove('hidden');
        initializePlatinumShop();
    } else {
        platinumShop.classList.add('hidden');
    }
}

// Initialize the platinum shop
function initializePlatinumShop() {
    const platinumShop = document.getElementById('platinum-shop');
    if (!platinumShop) return;
    
    platinumShop.innerHTML = `
        <h3>Platinum Shop</h3>
        <p>You have <span id="shop-platinum-points">${game.platinumPoints}</span> Platinum Points to spend</p>
        <div class="platinum-upgrades"></div>
    `;
    
    const upgradesContainer = platinumShop.querySelector('.platinum-upgrades');
    
    // Add each upgrade
    const upgrades = [
        {
            id: 'fanRetention',
            name: 'Fan Retention',
            description: 'Keep some of your fans when going platinum',
            effectText: 'Keep 5% of fans per level when going platinum'
        },
        {
            id: 'earlyBird',
            name: 'Early Bird',
            description: 'Start with some albums and money after going platinum',
            effectText: 'Start with +1 album and $1,000 per level'
        },
        {
            id: 'goldenTouch',
            name: 'Golden Touch',
            description: 'All money gains are increased',
            effectText: '+10% money gained per level'
        },
        {
            id: 'fastLearner',
            name: 'Fast Learner',
            description: 'Gain more XP from practicing',
            effectText: '+15% XP from practice per level'
        },
        {
            id: 'hitMaker',
            name: 'Hit Maker',
            description: 'Your albums are worth more',
            effectText: '+20% album value per level'
        },
        {
            id: 'tourManager',
            name: 'Tour Manager',
            description: 'Better rewards from touring',
            effectText: '+25% fame and money from tours per level'
        }
    ];
    
    upgrades.forEach(upgrade => {
        const currentLevel = game.platinumUpgrades[upgrade.id];
        const nextCost = calculatePlatinumUpgradeCost(upgrade.id);
        
        const upgradeElement = document.createElement('div');
        upgradeElement.className = 'platinum-upgrade';
        upgradeElement.innerHTML = `
            <div class="upgrade-info">
                <h4>${upgrade.name}</h4>
                <p>${upgrade.description}</p>
                <p class="effect">${upgrade.effectText}</p>
                <p class="level">Level: ${currentLevel}</p>
            </div>
            <button class="buy-platinum-upgrade" data-upgrade="${upgrade.id}" 
                    ${game.platinumPoints < nextCost ? 'disabled' : ''}>
                Buy (${nextCost} PP)
            </button>
        `;
        
        upgradesContainer.appendChild(upgradeElement);
    });
    
    // Add event listeners to buy buttons
    const buyButtons = platinumShop.querySelectorAll('.buy-platinum-upgrade');
    buyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const upgradeId = button.getAttribute('data-upgrade');
            buyPlatinumUpgrade(upgradeId);
        });
    });
}

// Calculate the cost of the next level of a platinum upgrade
function calculatePlatinumUpgradeCost(upgradeId) {
    const upgradeDefinition = game.platinumUpgradeDefinitions[upgradeId];
    const currentLevel = game.platinumUpgrades[upgradeId];
    
    return Math.floor(upgradeDefinition.baseCost * 
                    Math.pow(upgradeDefinition.costMultiplier, currentLevel));
}

// Buy a platinum upgrade
function buyPlatinumUpgrade(upgradeId) {
    const cost = calculatePlatinumUpgradeCost(upgradeId);
    
    if (game.platinumPoints >= cost) {
        game.platinumPoints -= cost;
        game.platinumUpgrades[upgradeId]++;
        
        // Apply immediate effects if needed
        applyPlatinumBonuses();
        
        // Update UI
        updateUI();
        initializePlatinumShop(); // Refresh the shop
        
        addNotification(`Purchased ${upgradeId} platinum upgrade! Now at level ${game.platinumUpgrades[upgradeId]}.`);
    } else {
        addNotification("Not enough Platinum Points!");
    }
}

// Initialize the game when the page loads
window.addEventListener('load', init);

// Update the addGenre function to show the trade-offs
function addGenre(genre, container) {
    const genreDiv = document.createElement('div');
    genreDiv.className = 'genre-item';
    
    const genreData = game.genreDefinitions[genre] || game.fusionGenres[genre];
    const switchCost = genreData.switchCost;
    
    const genreButton = document.createElement('button');
    genreButton.className = game.currentGenre === genre ? 'genre-btn active' : 'genre-btn';
    genreButton.innerHTML = `${genre} <small>(${switchCost} albums)</small><div class="genre-effects">${getGenreTradeoffsHTML(genre)}</div>`;
    genreButton.addEventListener('click', () => switchGenre(genre));
    
    genreDiv.appendChild(genreButton);
    container.appendChild(genreDiv);
}

// Helper function to create HTML for genre trade-offs
function getGenreTradeoffsHTML(genre) {
    const genreData = game.genreDefinitions[genre] || game.fusionGenres[genre];
    if (!genreData) return "";
    
    let html = '<ul class="genre-tradeoffs">';
    
    if (genreData.albumCostModifier !== 1) {
        const percent = Math.abs((genreData.albumCostModifier - 1) * 100);
        const isPositive = genreData.albumCostModifier < 1;
        html += `<li class="${isPositive ? 'positive' : 'negative'}">Albums ${genreData.albumCostModifier > 1 ? 'cost' : 'cost'} ${percent}% ${genreData.albumCostModifier > 1 ? 'more' : 'less'}</li>`;
    }
    
    if (genreData.xpModifier !== 1) {
        const percent = Math.abs((genreData.xpModifier - 1) * 100);
        const isPositive = genreData.xpModifier > 1;
        html += `<li class="${isPositive ? 'positive' : 'negative'}">Practice: ${percent}% ${genreData.xpModifier > 1 ? 'more' : 'less'} XP</li>`;
    }
    
    if (genreData.salesRateModifier !== 1) {
        const percent = Math.abs((genreData.salesRateModifier - 1) * 100);
        const isPositive = genreData.salesRateModifier > 1;
        html += `<li class="${isPositive ? 'positive' : 'negative'}">Sales: ${percent}% ${genreData.salesRateModifier > 1 ? 'faster' : 'slower'}</li>`;
    }
    
    if (genreData.albumValueModifier && genreData.albumValueModifier !== 1) {
        const percent = Math.abs((genreData.albumValueModifier - 1) * 100);
        const isPositive = genreData.albumValueModifier > 1;
        html += `<li class="${isPositive ? 'positive' : 'negative'}">Album value: ${percent}% ${genreData.albumValueModifier > 1 ? 'higher' : 'lower'}</li>`;
    }
    
    if (genreData.fameModifier && genreData.fameModifier !== 1) {
        const percent = Math.abs((genreData.fameModifier - 1) * 100);
        const isPositive = genreData.fameModifier > 1;
        html += `<li class="${isPositive ? 'positive' : 'negative'}">Fame: ${percent}% ${genreData.fameModifier > 1 ? 'more' : 'less'}</li>`;
    }
    
    html += '</ul>';
    return html;
}

// Updated initializeCollapsibleSections function to properly collapse sections
function initializeCollapsibleSections() {
    const sections = [
        { id: 'store-section', title: 'Store', default: true },
        { id: 'genres-section', title: 'Genres', default: true },
        { id: 'band-members-section', title: 'Band Members', default: true },
        { id: 'stats-section', title: 'Stats', default: false }
    ];
    
    sections.forEach(section => {
        // Get section element
        const sectionElement = document.getElementById(section.id);
        if (!sectionElement) return;
        
        // Get or create section header
        let headerElement = sectionElement.querySelector('.section-header');
        if (!headerElement) {
            // Store original content
            const sectionContent = sectionElement.innerHTML;
            
            // Create new header with toggle button
            headerElement = document.createElement('div');
            headerElement.className = 'section-header';
            
            // Get the first h2 if it exists
            const existingHeader = sectionElement.querySelector('h2');
            const headerTitle = existingHeader ? existingHeader.textContent : section.title;
            
            headerElement.innerHTML = `
                <h2>${headerTitle}</h2>
                <button class="toggle-btn">▼</button>
            `;
            
            // Create content container
            const contentElement = document.createElement('div');
            contentElement.className = 'section-content';
            contentElement.innerHTML = existingHeader ? sectionElement.innerHTML.replace(existingHeader.outerHTML, '') : sectionContent;
            
            // Clear and rebuild section
            sectionElement.innerHTML = '';
            sectionElement.appendChild(headerElement);
            sectionElement.appendChild(contentElement);
        }
        
        // Get content element and toggle button
        const contentElement = sectionElement.querySelector('.section-content');
        const toggleBtn = headerElement.querySelector('.toggle-btn');
        
        // Load saved state or use default
        const isExpanded = localStorage.getItem(`${section.id}-expanded`) !== null ? 
            localStorage.getItem(`${section.id}-expanded`) === 'true' : 
            section.default;
        
        // Apply initial state
        if (!isExpanded) {
            contentElement.style.display = 'none';
            toggleBtn.textContent = '►';
            sectionElement.classList.add('collapsed');
        }
        
        // Add click handler
        headerElement.addEventListener('click', (e) => {
            // Don't trigger if clicking on a button inside the header (other than toggle button)
            if (e.target.tagName === 'BUTTON' && e.target !== toggleBtn) return;
            
            const isCurrentlyExpanded = contentElement.style.display !== 'none';
            
            // Toggle state
            contentElement.style.display = isCurrentlyExpanded ? 'none' : 'block';
            toggleBtn.textContent = isCurrentlyExpanded ? '►' : '▼';
            sectionElement.classList.toggle('collapsed', isCurrentlyExpanded);
            
            // Save state
            localStorage.setItem(`${section.id}-expanded`, !isCurrentlyExpanded);
        });
    });
}

// Update the function that adds genres
function updateGenres() {
    const genresContainer = document.querySelector('.genres-container');
    genresContainer.innerHTML = ''; // Clear existing genres
    
    // Add base genres first
    Object.keys(game.genreDefinitions).forEach(genre => {
        addGenreWithAvailability(genre, genresContainer);
    });
    
    // Add fusion genres if unlocked
    if (game.hasKeyboardist) {
        // Add a separator
        const separator = document.createElement('div');
        separator.className = 'genre-separator';
        separator.innerHTML = '<h3>Fusion Genres</h3>';
        genresContainer.appendChild(separator);
        
        Object.keys(game.fusionGenres).forEach(genre => {
            addGenreWithAvailability(genre, genresContainer);
        });
    }
}

// New function to add a genre button with proper availability
function addGenreWithAvailability(genre, container) {
    const genreDiv = document.createElement('div');
    genreDiv.className = 'genre-item';
    
    const genreData = game.genreDefinitions[genre] || game.fusionGenres[genre];
    const switchCost = genreData.switchCost;
    const canAfford = game.albums >= switchCost;
    const isCurrentGenre = game.currentGenre === genre;
    
    const genreButton = document.createElement('button');
    
    // Set appropriate classes
    let buttonClasses = ['genre-btn'];
    if (isCurrentGenre) buttonClasses.push('active');
    if (!canAfford && !isCurrentGenre) buttonClasses.push('disabled');
    
    genreButton.className = buttonClasses.join(' ');
    genreButton.disabled = !canAfford && !isCurrentGenre;
    
    // Create HTML for the button
    genreButton.innerHTML = `
        ${genre} <small>(${switchCost} albums)</small>
        <div class="genre-effects">${getGenreTradeoffsHTML(genre)}</div>
    `;
    
    // Add click handler
    genreButton.addEventListener('click', () => switchGenre(genre));
    
    genreDiv.appendChild(genreButton);
    container.appendChild(genreDiv);
}

// Updated fixStoreCollapse function to avoid duplicate structures
function fixStoreCollapse() {
    const storeSection = document.getElementById('store-section');
    if (!storeSection) return;
    
    // First, check if the store section already has correct structure
    const existingHeaders = storeSection.querySelectorAll('.section-header');
    
    // If there's more than one header, we need to clean up the duplicates
    if (existingHeaders.length > 1) {
        // Keep only the first header and content pair
        const firstHeader = existingHeaders[0];
        const firstContent = storeSection.querySelector('.section-content');
        
        // Get the actual content without any extra headers
        const contentItems = firstContent.querySelectorAll('.upgrades, .upgrade-item');
        
        // Create clean new content element
        const cleanContent = document.createElement('div');
        cleanContent.className = 'section-content';
        
        // Add the upgrades container if it exists
        const upgradesContainer = document.createElement('div');
        upgradesContainer.className = 'upgrades';
        
        // Add all the upgrade items to the upgrades container
        contentItems.forEach(item => {
            if (item.classList.contains('upgrade-item')) {
                upgradesContainer.appendChild(item.cloneNode(true));
            }
        });
        
        cleanContent.appendChild(upgradesContainer);
        
        // Clear and rebuild with clean structure
        storeSection.innerHTML = '';
        storeSection.appendChild(firstHeader.cloneNode(true));
        storeSection.appendChild(cleanContent);
    }
    
    // Re-attach event listeners to all store buttons
    const buttonIds = {
        'better-guitar': buyBetterGuitar,
        'recording-equipment': buyRecordingEquipment,
        'marketing': buyMarketing,
        'studio-time': buyStudioTime,
        'producer': buyProducer,
        'metronome': buyMetronome
    };
    
    Object.entries(buttonIds).forEach(([id, handler]) => {
        const button = document.getElementById(id);
        if (button) {
            // Remove all existing event listeners
            const newButton = button.cloneNode(true);
            if (button.parentNode) {
                button.parentNode.replaceChild(newButton, button);
            }
            
            // Add fresh event listener
            newButton.addEventListener('click', handler);
        }
    });
    
    // Get the toggle button and add event listener
    const toggleBtn = storeSection.querySelector('.toggle-btn');
    const headerElement = storeSection.querySelector('.section-header');
    const contentElement = storeSection.querySelector('.section-content');
    
    if (toggleBtn && headerElement && contentElement) {
        // Remove existing event listeners
        const newHeader = headerElement.cloneNode(true);
        storeSection.replaceChild(newHeader, headerElement);
        
        // Get the new toggle button
        const newToggleBtn = newHeader.querySelector('.toggle-btn');
        
        // Add fresh event listener
        newHeader.addEventListener('click', (e) => {
            // Only toggle if clicking on the header or toggle button directly
            if (e.target !== newHeader && 
                e.target !== newToggleBtn && 
                e.target !== newHeader.querySelector('h2')) {
                return;
            }
            
            const isCurrentlyExpanded = !storeSection.classList.contains('collapsed');
            
            // Toggle state
            if (isCurrentlyExpanded) {
                contentElement.style.display = 'none';
                newToggleBtn.textContent = '►';
                storeSection.classList.add('collapsed');
            } else {
                contentElement.style.display = 'block';
                newToggleBtn.textContent = '▼';
                storeSection.classList.remove('collapsed');
            }
            
            // Save state
            localStorage.setItem('store-section-expanded', !isCurrentlyExpanded);
        });
        
        // Apply initial collapsed state if needed
        const shouldBeCollapsed = localStorage.getItem('store-section-expanded') === 'false';
        if (shouldBeCollapsed) {
            contentElement.style.display = 'none';
            newToggleBtn.textContent = '►';
            storeSection.classList.add('collapsed');
        }
    }
}

// Create functions for all store buttons if they don't exist
function buyBetterGuitar() {
    buyUpgrade('betterGuitar');
}

function buyRecordingEquipment() {
    buyUpgrade('recordingEquipment');
}

function buyMarketing() {
    buyUpgrade('marketing');
}

function buyStudioTime() {
    buyUpgrade('studioTime');
}

function buyProducer() {
    buyUpgrade('producer');
}

// Fix for the store item interactivity issue
function fixStoreInteractivity() {
    // Directly connect event listeners to store buttons by ID
    const buttonIds = {
        'better-guitar': 'betterGuitar',
        'recording-equipment': 'recordingEquipment',
        'marketing': 'marketing',
        'studio-time': 'studioTime',
        'producer': 'producer',
        'metronome': 'metronome'
    };
    
    // Remove all existing event listeners and reattach them
    Object.entries(buttonIds).forEach(([id, upgradeType]) => {
        const button = document.getElementById(id);
        if (button) {
            // Clone and replace to remove existing listeners
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            // Add a direct click handler that calls buyUpgrade
            if (id === 'metronome') {
                newButton.addEventListener('click', buyMetronome);
            } else {
                newButton.addEventListener('click', function() {
                    buyUpgrade(upgradeType);
                });
            }
            
            // Update the reference in domElements if needed
            if (id === 'metronome') {
                domElements.metronomeBtn = newButton;
            } else {
                domElements[`${upgradeType}Btn`] = newButton;
            }
        }
    });
}

// Enhanced updateStoreButtons function to also update text content
function updateStoreButtons() {
    // First check which items should be unlocked based on game progress
    const shouldUnlockBetterGuitar = game.albums >= 3;
    const shouldUnlockRecordingEquipment = game.albums >= 5;
    const shouldUnlockMarketing = game.upgradeCounts.recordingEquipment > 0;
    const shouldUnlockStudioTime = game.upgradeCounts.marketing > 0;
    const shouldUnlockProducer = game.upgradeCounts.studioTime > 0;
    
    // Update Better Guitar button
    if (domElements.betterGuitarBtn) {
        const betterGuitarCost = game.currentUpgradeCosts.betterGuitar;
        // The button should be enabled if it's unlocked AND player has enough money
        const isUnlocked = shouldUnlockBetterGuitar;
        const canAfford = game.money >= betterGuitarCost;
        
        // If it's not unlocked yet, it should be disabled regardless of money
        // If it's unlocked, it should be enabled only if player can afford it
        domElements.betterGuitarBtn.disabled = !isUnlocked || !canAfford;
        
        domElements.betterGuitarBtn.innerHTML = `
            Better Guitar ($${betterGuitarCost.toLocaleString()}) <br>
            <small>Practice gives +1 XP per level</small>
            <div class="upgrade-level">Level: ${game.upgradeCounts.betterGuitar}</div>
        `;
    }
    
    // Update Recording Equipment button
    if (domElements.recordingEquipmentBtn) {
        const recordingEquipmentCost = game.currentUpgradeCosts.recordingEquipment;
        const isUnlocked = shouldUnlockRecordingEquipment;
        const canAfford = game.money >= recordingEquipmentCost;
        
        domElements.recordingEquipmentBtn.disabled = !isUnlocked || !canAfford;
        
        domElements.recordingEquipmentBtn.innerHTML = `
            Recording Equipment ($${recordingEquipmentCost.toLocaleString()}) <br>
            <small>Albums worth +$1 each per level</small>
            <div class="upgrade-level">Level: ${game.upgradeCounts.recordingEquipment}</div>
        `;
    }
    
    // Update Marketing button
    if (domElements.marketingBtn) {
        const marketingCost = game.currentUpgradeCosts.marketing;
        const isUnlocked = shouldUnlockMarketing;
        const canAfford = game.money >= marketingCost;
        
        domElements.marketingBtn.disabled = !isUnlocked || !canAfford;
        
        domElements.marketingBtn.innerHTML = `
            Marketing Campaign ($${marketingCost.toLocaleString()}) <br>
            <small>Albums sell 25% faster per level</small>
            <div class="upgrade-level">Level: ${game.upgradeCounts.marketing}</div>
        `;
    }
    
    // Update Studio Time button
    if (domElements.studioTimeBtn) {
        const studioTimeCost = game.currentUpgradeCosts.studioTime;
        const isUnlocked = shouldUnlockStudioTime && game.hasMetronome;
        const canAfford = game.money >= studioTimeCost;
        
        domElements.studioTimeBtn.disabled = !isUnlocked || !canAfford;
        
        domElements.studioTimeBtn.innerHTML = `
            Studio Time ($${studioTimeCost.toLocaleString()}) <br>
            <small>Auto-practice efficiency +50% per level</small>
            <div class="upgrade-level">Level: ${game.upgradeCounts.studioTime}</div>
        `;
    }
    
    // Update Producer button
    if (domElements.producerBtn) {
        const producerCost = game.currentUpgradeCosts.producer;
        const isUnlocked = shouldUnlockProducer;
        const canAfford = game.money >= producerCost;
        
        domElements.producerBtn.disabled = !isUnlocked || !canAfford;
        
        domElements.producerBtn.innerHTML = `
            Hire Producer ($${producerCost.toLocaleString()}) <br>
            <small>Album value +50% per level</small>
            <div class="upgrade-level">Level: ${game.upgradeCounts.producer}</div>
        `;
    }
    
    // Update Metronome button if it exists
    if (domElements.metronomeBtn) {
        const canAfford = game.money >= game.metronomeBaseCost;
        domElements.metronomeBtn.disabled = game.hasMetronome || !canAfford;
        
        domElements.metronomeBtn.innerHTML = `
            Metronome ($${game.metronomeBaseCost}) <br>
            <small>Enables auto-practice (1 XP/second)</small>
            <div class="upgrade-level">${game.hasMetronome ? 'Purchased' : 'Not Purchased'}</div>
        `;
    }
    
    // Update record album button text
    domElements.recordAlbumBtn.textContent = `Record Album (${Math.floor(game.currentAlbumCost)} XP)`;
}

// Create a dedicated function to start auto-practice
function startAutoPractice() {
    // Clear any existing interval first to prevent duplicates
    if (game.autoPracticeIntervalId) {
        clearInterval(game.autoPracticeIntervalId);
    }
    
    // Create a new interval
    game.autoPracticeIntervalId = setInterval(() => {
        // Calculate base practice rate with studio time multiplier if available
        let practiceRate = game.upgradeCounts.studioTime > 0 
            ? game.xpPerPractice * game.autoPracticeRate 
            : game.xpPerPractice;
            
        // Apply Fast Learner platinum upgrade if purchased
        if (game.platinumUpgrades.fastLearner > 0) {
            const fastLearnerBonus = 1 + (game.platinumUpgrades.fastLearner * 
                                    game.platinumUpgradeDefinitions.fastLearner.baseEffect);
            practiceRate *= fastLearnerBonus;
        }
        
        // Apply platinum multiplier
        practiceRate *= game.platinumMultiplier;
        
        // Add XP (rounded to prevent fractional XP)
        game.experience += Math.floor(practiceRate);
        updateUI();
    }, 1000);
}

// Add platinum styles to ensure the section is visible
function addPlatinumStyles() {
    // Check if styles are already added
    if (document.getElementById('platinum-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'platinum-styles';
    style.textContent = `
        .platinum-section {
            margin: 20px auto;
            padding: 15px;
            border: 2px solid #FFD700;
            border-radius: 8px;
            background-color: #FFFAF0;
            max-width: 600px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .platinum-section .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
        }
        .platinum-section h2 {
            color: #996515;
            margin: 0;
        }
        .platinum-description {
            font-style: italic;
            color: #555;
        }
        .platinum-info {
            background-color: #FFF8DC;
            padding: 10px;
            border-radius: 4px;
            margin: 10px 0;
        }
        .platinum-info p {
            margin: 5px 0;
        }
        .platinum-btn {
            background-color: #FFD700;
            color: #333;
            padding: 10px 20px;
            margin-top: 10px;
            font-weight: bold;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        .platinum-btn:hover:not([disabled]) {
            background-color: #FFC125;
        }
        .platinum-btn:disabled {
            background-color: #E6E6E6;
            color: #999;
            cursor: not-allowed;
        }
        .platinum-shop-btn {
            background-color: #C0C0C0;
            color: #333;
            padding: 10px 20px;
            margin-left: 10px;
            font-weight: bold;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        .platinum-shop-btn:hover {
            background-color: #A9A9A9;
        }
        .platinum-shop {
            margin-top: 15px;
            padding: 10px;
            border: 1px solid #DDD;
            border-radius: 4px;
            background-color: #FFF;
        }
        .platinum-shop h3 {
            color: #996515;
            border-bottom: 1px solid #FFD700;
            padding-bottom: 5px;
        }
        .platinum-shop.hidden {
            display: none;
        }
        .platinum-upgrades {
            display: grid;
            grid-template-columns: 1fr;
            gap: 10px;
        }
        @media (min-width: 768px) {
            .platinum-upgrades {
                grid-template-columns: repeat(2, 1fr);
            }
        }
        .platinum-upgrade {
            display: flex;
            flex-direction: column;
            padding: 10px;
            border: 1px solid #EEE;
            border-radius: 4px;
            background-color: #FAFAFA;
        }
        .upgrade-info {
            flex: 1;
        }
        .platinum-upgrade h4 {
            margin: 0 0 5px 0;
            color: #996515;
        }
        .platinum-upgrade p {
            margin: 3px 0;
            font-size: 0.9em;
        }
        .platinum-upgrade .effect {
            font-weight: bold;
            color: #4682B4;
        }
        .platinum-upgrade .level {
            font-weight: bold;
            color: #996515;
        }
        .buy-platinum-upgrade {
            background-color: #FFD700;
            color: #333;
            padding: 8px 15px;
            margin-top: 10px;
            font-weight: bold;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            align-self: flex-end;
        }
        .buy-platinum-upgrade:hover:not([disabled]) {
            background-color: #FFC125;
        }
        .buy-platinum-upgrade:disabled {
            background-color: #E6E6E6;
            color: #999;
            cursor: not-allowed;
        }
    `;
    
    document.head.appendChild(style);
}

// Social Media function
function makePost() {
    console.log("makePost function called");
    if (game.experience >= game.socialMediaCost) {
        game.experience -= game.socialMediaCost;
        game.socialMediaLevel++;
        
        // Update the cost for the next level (1.5x multiplier, similar to album cost)
        game.socialMediaCost = Math.floor(100 * Math.pow(1.5, game.socialMediaLevel));
        
        addNotification(`You made a social media post! Fan gain increased by 1%`);
        
        // Log the action for debugging
        console.log(`Social media post made. New level: ${game.socialMediaLevel}, Next cost: ${game.socialMediaCost}`);
        
        updateUI();
    } else {
        console.log(`Not enough XP. Have: ${game.experience}, Need: ${game.socialMediaCost}`);
    }
}