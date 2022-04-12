const clickerGame = {
    buttonElement: $('#clicker-button'),
    pointsElement: $('#points-view'),

    pointsTotal: 0,

    pointsMultiplier : 1,
    pointsBase: 1,

    autoRate: 0,

    clickCount: 0,

    bonus: {
        active: false,
        id: null,
        top: 0,
        left: 0,
        timer: 0,
        interval: null,
    },


    upgradeSettings: [
        {base: 1, mult: 0 , cost: 50},
        {base: 0, mult: 1.5 , cost: 1000},
        {base: 1, mult: 0 , cost: 100, auto: true}
    ],

    shortifyNumber: function(num) {
        let string = String(Math.trunc(num))

        const oneDigit = (end) => {
            string = `${string.charAt(0)}.${string.charAt(1) + end}`
            return string
        }

        const twoDigit = (end) => {
            string = `${string.charAt(0) + string.charAt(1)}.${string.charAt(2) + end}`
            return string
        }

        const threeDigit = (end) => {
            string = `${string.charAt(0) + string.charAt(1) + string.charAt(2)}.${string.charAt(3) + end}`
            return string
        }

        switch (string.length) {
            case 4:
                return oneDigit('k');
            case 5:
                return twoDigit('k');
            case 6:
                return threeDigit('k');
            case 7:
                return oneDigit('m');
            case 8:
                return twoDigit('m');
            case 9:
                return threeDigit('m');
            case 10:
                return oneDigit('b');
            case 11:
                return twoDigit('b');
            case 12:
                return threeDigit('b');
            default:
                return string
        }
    },

    autoclicker: function() {
        setInterval(() => {
            this.click(this.autoRate)
            this.randomBonus()
        }, 1000);
    },

    randomBonus: function () {
        if (!this.bonus.active && Math.floor(Math.random() * 100) === 77) {
            this.bonus.active = true
            this.bonus.id = `#bonus${this.clickCount}`
            let bonus = $(`<h2 class="bonus" id="bonus${this.clickCount}">Money</h2>`)
            bonus.on('click', (e) => {
                this.click(this.autoRate * 30)
                this.bonus.active = false
                bonus.remove()
                this.bonus.timer = 0
                this.bonus.top = 0
                this.bonus.left = 0
                clearInterval(this.bonus.interval)
            })
            bonus.css({top: `${this.bonus.top}px`, left: `${this.bonus.left}px`,})
            $('body').append(bonus)
            this.bonus.interval = setInterval(() => {
                this.bonus.top += 30
                this.bonus.left += 35
                $(this.bonus.id).css({top: `${this.bonus.top}px`, left: `${this.bonus.left}px`,})
                if (this.bonus.timer > 9) {
                    $(this.bonus.id).remove()
                    this.bonus.active = false
                    this.bonus.timer = 0
                    this.bonus.top = 0
                    this.bonus.left = 0
                    clearInterval(this.bonus.interval)
                }
            }, 100)
        } else if (this.bonus.active) {
            this.bonus.timer ++
        }
    },


    floatingText: function(amount) {
        if (amount !== 0) {
            let floatingText = $(`<h1 id="floating-text${this.clickCount}" class="floating-text">+ ${this.shortifyNumber(amount)}</h1>`)
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
                        $(`#upgrade${i}`).text(`Sharpen sword: ${this.shortifyNumber(this.upgradeSettings[i].cost)}`)
                    } else {
                        $(`#upgrade${i}`).text(`Train with knights: ${this.shortifyNumber(this.upgradeSettings[i].cost)}`)
                    }
                } else {
                    $(`#upgrade${i}`).text(`Recruit squire: ${this.shortifyNumber(this.upgradeSettings[i].cost)}`)
                }
            }
        }
        this.pointsElement.text(`You have ${this.shortifyNumber(this.pointsTotal)} points.`)
    },

    click: function(rate = 1) {
        this.pointsTotal += (this.pointsBase * this.pointsMultiplier) * rate
        this.pointsElement.text(`You have ${this.shortifyNumber(this.pointsTotal)} points.`)
        this.floatingText((this.pointsBase * this.pointsMultiplier) * rate)
        this.clickCount ++
    },

    cheatCode: function(amount = 1000) {
        let lastKey = null
        $(document).on('keydown', (e) => {
            if (!lastKey) {
                switch (e.key) {
                    case '1':
                        lastKey = '1';
                        break;
                }
            } else if (lastKey.length < 2) {
                switch (e.key) {
                    case '6':
                        lastKey += '6'
                        break;
                    default:
                        lastKey = null
                        break;
                }
            } else if (lastKey.length < 3) {
                switch (e.key) {
                    case ('4'):
                        lastKey += '4'
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
        this.cheatCode()
        this.setupUpgrades()
        this.buttonElement.on('click', (e) => {
            this.click()
        })
        this.autoclicker()
    }
}

clickerGame.init()
