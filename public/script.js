const clickerGame = {
    buttonElement: document.getElementById('clicker-button'),
    pointsElement: document.getElementById('points-view'),

    pointsTotal: 0,

    pointsMultiplier : 1,
    pointsBase: 10,

    upgradeButtons: [],

    findUpgrades: function() {
        for (let i = 0; i < 4; i++) {
            if (document.getElementById(`upgrade${i}`)) {
                this.upgradeButtons.push(document.getElementById(`upgrade${i}`))
            }
        }
    },

    

    init: function() {
        this.findUpgrades()
        console.log(this.upgradeButtons)
        this.buttonElement.addEventListener('click', (e) => {
            this.pointsTotal += (this.pointsBase * this.pointsMultiplier)
            this.pointsMultiplier ++
            this.pointsBase ++
            this.pointsElement.innerText = `You have ${this.pointsTotal} points.`
        })
    }
}

clickerGame.init()