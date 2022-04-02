class Upgrade {
    constructor(base, mult, cost, target) {
        this.base = base
        this.mult = mult
        this.cost = cost
        this.target = target
    }

    use() {
        if (this.target.pointsTotal > this.cost) {
            this.target.pointsTotal -= this.cost
            this.target.pointsBase += this.base
            this.target.pointsMultiplier += this.mult
            this.cost = this.cost * 2
            this.base = this.base * 1.5
            this.mult = this.base * 1.5
        }    
    }
}

const clickerGame = {
    buttonElement: document.getElementById('clicker-button'),
    pointsElement: document.getElementById('points-view'),

    pointsTotal: 0,

    pointsMultiplier : 1,
    pointsBase: 1,

    upgradeSettings: [
        {base: 1, mult: 0 , cost: 50},
        {base: 0, mult: 1.5 , cost: 1000},
        {base: 2, mult: 0 , cost: 10},
        {base: 0, mult: 2 , cost: 100}
    ],

    setupUpgrades: function() {
        for (let i = 0; i < this.upgradeSettings.length; i ++) {
            if (document.getElementById(`upgrade${i}`)) {
                document.getElementById(`upgrade${i}`).addEventListener('click', (e) => {
                    if (this.pointsTotal >= this.upgradeSettings[i].cost) {
                        this.pointsTotal -= this.upgradeSettings[i].cost
                        this.pointsBase += this.upgradeSettings[i].base
                        this.pointsMultiplier += this.upgradeSettings[i].mult
                        this.upgradeSettings[i].cost *= 2
                        this.upgradeSettings[i].base *= 1.5
                        this.upgradeSettings[i].mult *= 1.5
                        this.updateDisplays()
                    }
                })
            }
        }
        this.updateDisplays()
    },

    updateDisplays: function() {
        for (let i = 0; i < this.upgradeSettings.length; i ++) {
            if (document.getElementById(`upgrade${i}`)) {
                document.getElementById(`upgrade${i}`).innerText = `Cost is ${this.upgradeSettings[i].cost}`
            }
        }
        this.pointsElement.innerText = `You have ${Math.trunc(this.pointsTotal)} points.`
    },

    init: function() {
        this.setupUpgrades()
        this.buttonElement.addEventListener('click', (e) => {
            this.pointsTotal += (this.pointsBase * this.pointsMultiplier)
            this.pointsElement.innerText = `You have ${Math.trunc(this.pointsTotal)} points.`
        })
    }
}

clickerGame.init()