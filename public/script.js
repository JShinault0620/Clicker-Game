const clickerGame = {
    buttonElement: $('#clicker-button'),
    pointsElement: $('#points-view'),

    pointsTotal: 0,

    pointsMultiplier : 1,
    pointsBase: 1,

    autoRate: 0,

    clickCount: 0,

    upgradeSettings: [
        {base: 1, mult: 0 , cost: 50},
        {base: 0, mult: 1.5 , cost: 1000},
        {base: 1, mult: 0 , cost: 100, auto: true}
    ],

    shortifyNumber: function(num) {
        let string = String(Math.trunc(num))
        if (string.length < 4) {
            return string
        } else if (string.length > 12) {
            return string
        } else if (string.length > 11) {
            string = `${string.charAt(0) + string.charAt(1) + string.charAt(2)}.${string.charAt(3)}b`
            return string
        } else if (string.length > 10) {
            string = `${string.charAt(0) + string.charAt(1)}.${string.charAt(2)}b`
            return string
        } else if (string.length > 9) {
            string = `${string.charAt(0)}.${string.charAt(1)}b`
            return string
        } else if (string.length > 8) {
            string = `${string.charAt(0) + string.charAt(1) + string.charAt(2)}.${string.charAt(3)}m`
            return string
        } else if (string.length > 7) {
            string = `${string.charAt(0) + string.charAt(1)}.${string.charAt(2)}m`
            return string
        } else if (string.length > 6) {
            string = `${string.charAt(0)}.${string.charAt(1)}m`
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

    floatingText: function(amount) {
        if (amount !== 0) {
            let floatingText = $(`<h2 id = "floating-text${this.clickCount}" class = "floating-text">+ ${this.shortifyNumber(amount)}</h2>`)
            floatingText.css('left', (this.buttonElement.offset().left + Math.floor(Math.random() * 300)) + 'px')
            floatingText.css('top', (this.buttonElement.offset().top + Math.floor(Math.random() * -50)) + 'px')
            $('body').append(floatingText)
            setTimeout(() => {
                floatingText.remove()
            }, 1000)
        }
    },

    setupUpgrades: function() {
        for (let i = 0; i < this.upgradeSettings.length; i ++) {
            if ($(`#upgrade${i}`)) {
                $(`#upgrade${i}`).on('click', (e) => {
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
            if ($(`#upgrade${i}`)) {
                if (!this.upgradeSettings[i].auto) {
                    if (this.upgradeSettings[i].base > this.upgradeSettings[i].mult) {
                        $(`#upgrade${i}`).text(`Sharpen sword: ${this.upgradeSettings[i].cost}`)
                    } else {
                        $(`#upgrade${i}`).text(`Train with knights: ${this.upgradeSettings[i].cost}`)
                    }
                } else {
                    $(`#upgrade${i}`).text(`Recruit squire: ${this.upgradeSettings[i].cost}`)
                }
            }
        }
        this.pointsElement.text(`You have ${this.shortifyNumber(Math.trunc(this.pointsTotal))} points.`)
    },

    click: function(rate = 1) {
        this.pointsTotal += (this.pointsBase * this.pointsMultiplier) * rate
        this.pointsElement.text(`You have ${this.shortifyNumber(Math.trunc(this.pointsTotal))} points.`)
        this.floatingText((this.pointsBase * this.pointsMultiplier) * rate)
        this.clickCount ++
    },

    randomBonus: function(multiplier = 1) {

    },

    cheatCode: function(amount = 1000) {
        let lastKey = null
        $(document).on('keydown', (e) => {
            if (!lastKey) {
                switch (e.key) {
                    case '1':
                        lastKey = '1';
                        console.log(lastKey)
                        break;
                }
            } else if (lastKey.length < 2) {
                switch (e.key) {
                    case '6':
                        lastKey += '6'
                        console.log(lastKey)
                        break;
                    default:
                        lastKey = null
                        break;
                }
            } else if (lastKey.length < 3) {
                switch (e.key) {
                    case ('4'):
                        lastKey += '4'
                        console.log(lastKey)
                        break;
                    default:
                        lastKey = null
                        break;
                }
            } else {
                switch (e.key) {
                    case '9':
                        this.pointsTotal += amount
                        this.updateDisplays()
                        lastKey = null
                        break;
                    default:
                        lastKey = null
                        break;
                }
            }
        })
    },

    init: function() {
        this.cheatCode(10000)
        this.setupUpgrades()
        this.buttonElement.on('click', (e) => {
            this.click()
        })
        this.autoclicker()
    }
}

clickerGame.init()