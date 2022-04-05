const clickerGame = {
    buttonElement: document.getElementById('clicker-button'),
    pointsElement: document.getElementById('points-view'),

    pointsTotal: 0,

    pointsMultiplier : 1,
    pointsBase: 1,

    autoRate: 0,

    upgradeSettings: [
        {base: 1, mult: 0 , cost: 50},
        {base: 0, mult: 1.5 , cost: 1000},
        {base: 1, mult: 0 , cost: 100, auto: true}
    ],

    shortifyNumber: function(num) {
        let string = String(num)
        if (string.length < 4) {
            return string
        } else if (string.length > 5) {
            string = `${string.charAt(0) + string.charAt(1) + string.charAt(2)}.${string.charAt(3)}k`
            return string
        } else if (string.length > 4) {
            string = `${string.charAt(0) + string.charAt(1)}.${string.charAt(2)}k`
            return string
        } else if (string.length > 3) {
            string = `${string.charAt(0)}.${string.charAt(1)}k`
            return string
        }
    },

    autoclicker: function() {
        setInterval(() => {
            this.click(this.autoRate)
        }, 1000);
    },

    setupUpgrades: function() {
        for (let i = 0; i < this.upgradeSettings.length; i ++) {
            if (document.getElementById(`upgrade${i}`)) {
                document.getElementById(`upgrade${i}`).addEventListener('click', (e) => {
                    if (this.pointsTotal >= this.upgradeSettings[i].cost && !this.upgradeSettings[i].auto) {
                        this.pointsTotal -= this.upgradeSettings[i].cost
                        this.pointsBase += this.upgradeSettings[i].base
                        this.pointsMultiplier += this.upgradeSettings[i].mult
                        this.upgradeSettings[i].cost *= 4
                        this.upgradeSettings[i].base *= 2
                        this.upgradeSettings[i].mult *= 1.5
                        this.updateDisplays()
                    } else if (this.pointsTotal >= this.upgradeSettings[i].cost && this.upgradeSettings[i].auto) {
                        this.pointsTotal -= this.upgradeSettings[i].cost
                        this.autoRate += this.upgradeSettings[i].base
                        this.upgradeSettings[i].cost *= 10
                        this.upgradeSettings[i].base *= 1.5
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
        this.pointsElement.innerText = `You have ${this.shortifyNumber(Math.trunc(this.pointsTotal))} points.`
    },

    click: function(rate = 1) {
        this.pointsTotal += (this.pointsBase * this.pointsMultiplier) * rate
        this.pointsElement.innerText = `You have ${this.shortifyNumber(Math.trunc(this.pointsTotal))} points.`
    },

    init: function() {
        let lastKey = null
        document.addEventListener('keydown', (e) => {
            if (!lastKey) {
                switch (e.key) {
                    case '1':
                        lastKey = '1';
                        console.log(lastKey)
                        break;
                }
            } else if (lastKey.length < 3) {
                switch (e.key) {
                    case '4':
                        lastKey += '4'
                        console.log(lastKey)
                        break;
                    case '6':
                        lastKey += '6'
                        console.log(lastKey)
                        break;
                    default:
                        lastKey = null
                        break;
                }
            } else {
                switch (e.key) {
                    case '9':
                        this.pointsTotal += 1000
                        this.updateDisplays()
                        lastKey = null
                        break;
                    default:
                        lastKey = null
                        break;
                }
            }
        })
        this.setupUpgrades()
        this.buttonElement.addEventListener('click', (e) => {
            this.click()
        })
        this.autoclicker()
    }
}

clickerGame.init()