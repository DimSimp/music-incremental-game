// Game state
const game = {
    experience: 0,
    albums: 0,
    money: 0,
    fame: 0,
    totalAlbumsSold: 0,
    
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
    
    // Prestige system (we'll implement this later)
    prestigeCount: 0,
    platinumRecords: 0,
    prestigeMultipliers: {
        xpGain: 1,
        moneyGain: 1,
        fameGain: 1
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
    
    // Set game loops
    game.gameLoopIntervalId = setInterval(gameLoop, 1000);
    game.autoSaveIntervalId = setInterval(saveGame, 30000);
    game.checkCollabIntervalId = setInterval(checkForCollabOpportunity, 60000);
    
    // Load saved game
    loadGame();
    
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
}

// Game actions
function practice() {
    // Add XP
    game.experience += game.xpPerPractice;
    
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
        
        updateUI();
        checkTourRequirements();
        
        // Check for milestones
        if (game.albums >= 3 && !game.hasBetterGuitar && domElements.betterGuitarBtn.disabled) {
            domElements.betterGuitarBtn.disabled = false;
            addNotification("New in store: Better Guitar! Improve your practice efficiency.");
        }
        
        if (game.albums >= 5 && !game.hasRecordingEquipment && domElements.recordingEquipmentBtn.disabled) {
            domElements.recordingEquipmentBtn.disabled = false;
            addNotification("New in store: Recording Equipment! Increase the value of your albums.");
        }
        
        // Genre unlock checks
        checkGenreUnlocks();
        
        addNotification(`You've recorded album #${game.albums}!`);
    }
}

function goOnTour() {
    // Check if the player meets requirements without subtracting albums
    if (game.albums >= game.currentTourAlbumCost && game.money >= game.currentTourMoneyCost) {
        // Only subtract money, not albums (albums are just a requirement)
        game.money -= game.currentTourMoneyCost;
        game.tourLevel++;
        
        // Calculate fame gain and tour profit based on tour level
        const fameGain = 1000 * Math.pow(1.2, game.tourLevel - 1);
        game.fame += fameGain;
        
        // Tours give an immediate boost in sales, scale with fame and tour level
        const tourProfit = 10000 * Math.sqrt(game.fame / 1000) * Math.pow(1.1, game.tourLevel - 1);
        game.money += tourProfit;
        
        // Increase the cost for the next tour
        game.currentTourAlbumCost = Math.floor(game.baseTourAlbumCost * Math.pow(game.tourAlbumCostMultiplier, game.tourLevel));
        game.currentTourMoneyCost = Math.floor(game.baseTourMoneyCost * Math.pow(game.tourMoneyCostMultiplier, game.tourLevel));
        
        updateSalesRate();
        updateUI();
        
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
        if (game.albums >= 5 && game.money >= 5000 && game.hasProducer && domElements.goOnTourBtn.disabled) {
            domElements.goOnTourBtn.disabled = false;
        }
    }
}

// Helper functions
function updateSalesRate() {
    // Base sales rate is albums * album value / 5 per second
    const baseRate = (game.albums * game.albumValue) / 5;
    
    // Apply multipliers
    const genreMultiplier = game.genreMultipliers[game.currentGenre] || 1;
    game.salesPerSecond = baseRate * game.salesMultiplier * game.collabMultiplier * genreMultiplier;
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
                        game.hasProducer;
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
}

// Add method to check tour requirements after various actions
function checkTourRequirements() {
    const canGoOnTour = game.albums >= game.currentTourAlbumCost && 
                        game.money >= game.currentTourMoneyCost && 
                        game.hasProducer;
                        
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
            totalAlbumsSold: 0,
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
            hasMetronome: false,
            metronomeBaseCost: 500,
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

// Create a dedicated function to start auto-practice
function startAutoPractice() {
    // Clear any existing interval first to prevent duplicates
    if (game.autoPracticeIntervalId) {
        clearInterval(game.autoPracticeIntervalId);
    }
    
    // Create a new interval
    game.autoPracticeIntervalId = setInterval(() => {
        // Use studio time multiplier if available
        const practiceRate = game.upgradeCounts.studioTime > 0 
            ? game.xpPerPractice * game.autoPracticeRate 
            : game.xpPerPractice;
            
        game.experience += practiceRate;
        updateUI();
    }, 1000);
}

// Add a function to calculate prestige rewards
function calculatePrestigeRewards() {
    // Base reward is based on total albums and fame
    const baseReward = Math.floor(Math.sqrt(game.albums * game.fame / 1000));
    
    // Minimum of 1 platinum record
    return Math.max(1, baseReward);
}

// Add a function to handle prestige (we'll call it "Go Platinum")
function goPlatinum() {
    if (game.albums < 50) {
        addNotification("You need at least 50 albums to Go Platinum!");
        return;
    }
    
    if (confirm("Are you sure you want to Go Platinum? You'll reset your progress but gain permanent bonuses!")) {
        // Calculate rewards
        const platinumRecordsEarned = calculatePrestigeRewards();
        game.platinumRecords += platinumRecordsEarned;
        game.prestigeCount++;
        
        // Apply permanent bonuses
        game.prestigeMultipliers.xpGain = 1 + (game.platinumRecords * 0.1); // +10% per platinum record
        game.prestigeMultipliers.moneyGain = 1 + (game.platinumRecords * 0.15); // +15% per platinum record
        game.prestigeMultipliers.fameGain = 1 + (game.platinumRecords * 0.2); // +20% per platinum record
        
        // Reset progress but keep prestige stats
        resetGameForPrestige();
        
        addNotification(`You went Platinum! Earned ${platinumRecordsEarned} platinum records. All future progress will be faster!`);
    }
}

// Add a function to reset the game for prestige
function resetGameForPrestige() {
    // Similar to resetGame() but preserve prestige-related properties
    
    // Store prestige values
    const prestigeCount = game.prestigeCount;
    const platinumRecords = game.platinumRecords;
    const prestigeMultipliers = {...game.prestigeMultipliers};
    
    // Reset everything
    resetGame(false); // Pass false to not show confirmation dialog
    
    // Restore prestige values
    game.prestigeCount = prestigeCount;
    game.platinumRecords = platinumRecords;
    game.prestigeMultipliers = prestigeMultipliers;
    
    // Apply prestige bonuses to starting values
    game.xpPerPractice = 1 * game.prestigeMultipliers.xpGain;
    game.albumValue = 5 * game.prestigeMultipliers.moneyGain;
    
    updateUI();
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
    // Update Better Guitar button
    if (domElements.betterGuitarBtn) {
        const betterGuitarCost = game.currentUpgradeCosts.betterGuitar;
        domElements.betterGuitarBtn.disabled = game.money < betterGuitarCost;
        
        domElements.betterGuitarBtn.innerHTML = `
            Better Guitar ($${betterGuitarCost.toLocaleString()}) <br>
            <small>Practice gives +1 XP per level</small>
            <div class="upgrade-level">Level: ${game.upgradeCounts.betterGuitar}</div>
        `;
    }
    
    // Update Recording Equipment button
    if (domElements.recordingEquipmentBtn) {
        const recordingEquipmentCost = game.currentUpgradeCosts.recordingEquipment;
        domElements.recordingEquipmentBtn.disabled = game.money < recordingEquipmentCost;
        
        domElements.recordingEquipmentBtn.innerHTML = `
            Recording Equipment ($${recordingEquipmentCost.toLocaleString()}) <br>
            <small>Albums worth +$1 each per level</small>
            <div class="upgrade-level">Level: ${game.upgradeCounts.recordingEquipment}</div>
        `;
    }
    
    // Update Marketing button
    if (domElements.marketingBtn) {
        const marketingCost = game.currentUpgradeCosts.marketing;
        const isDisabled = game.money < marketingCost || (game.upgradeCounts.recordingEquipment === 0);
        domElements.marketingBtn.disabled = isDisabled;
        
        domElements.marketingBtn.innerHTML = `
            Marketing Campaign ($${marketingCost.toLocaleString()}) <br>
            <small>Albums sell 25% faster per level</small>
            <div class="upgrade-level">Level: ${game.upgradeCounts.marketing}</div>
        `;
    }
    
    // Update Studio Time button
    if (domElements.studioTimeBtn) {
        const studioTimeCost = game.currentUpgradeCosts.studioTime;
        const isDisabled = game.money < studioTimeCost || !game.hasMetronome || (game.upgradeCounts.marketing === 0);
        domElements.studioTimeBtn.disabled = isDisabled;
        
        domElements.studioTimeBtn.innerHTML = `
            Studio Time ($${studioTimeCost.toLocaleString()}) <br>
            <small>Auto-practice efficiency +50% per level</small>
            <div class="upgrade-level">Level: ${game.upgradeCounts.studioTime}</div>
        `;
    }
    
    // Update Producer button
    if (domElements.producerBtn) {
        const producerCost = game.currentUpgradeCosts.producer;
        const isDisabled = game.hasProducer || 
                          game.money < producerCost || 
                          (game.upgradeCounts.studioTime === 0);
        domElements.producerBtn.disabled = isDisabled;
        
        domElements.producerBtn.innerHTML = `
            Hire Producer ($${producerCost.toLocaleString()}) <br>
            <small>Albums worth 2x more</small>
            <div class="upgrade-level">${game.hasProducer ? 'Hired' : 'Not Hired'}</div>
        `;
    }
    
    // Update Metronome button if it exists
    if (domElements.metronomeBtn) {
        domElements.metronomeBtn.disabled = game.hasMetronome || game.money < game.metronomeBaseCost;
        
        domElements.metronomeBtn.innerHTML = `
            Metronome ($${game.metronomeBaseCost}) <br>
            <small>Enables auto-practice (1 XP/second)</small>
            <div class="upgrade-level">${game.hasMetronome ? 'Purchased' : 'Not Purchased'}</div>
        `;
    }
    
    // Update record album button text
    domElements.recordAlbumBtn.textContent = `Record Album (${Math.floor(game.currentAlbumCost)} XP)`;
} 