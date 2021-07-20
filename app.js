new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        isRunning: false,
        logs: []
    },
    methods: {
        start(){
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.isRunning = true;
            this.logs = [];
        },
        attack(){
            this.attackPlayer(3, 10);
            if(this.win())
            return;
            this.attackMonster(6, 15);
            if(this.win())
            return;
        },
        specialAttack(){
            this.attackPlayer(10, 20);
            if(this.win())
            return;
            this.attackMonster(5, 12);
            if(this.win())
            return;
        },
        heal(){
            if(this.playerHealth < 90){
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            };
            this.logs.unshift({
                isPlayer: true,
                text: 'Player heals for 10'
            });
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: "The player's health has improved",
                showConfirmButton: false,
                timer: 1000
              })
            this.attackMonster(5, 10);
            this.win();
        },
        giveUp(){
            this.isRunning = false;
            Swal.fire({
                icon: 'warning',
                title: 'You were scared',
              })
        },
        attackPlayer(min, max){
            let damage = Math.floor(min + Math.random()*(max-min));
            this.monsterHealth -= damage;
            this.logs.unshift({
                isPlayer: true,
                text: 'Player hits monster for ' + damage
            });
        },
        attackMonster(min, max){
            let damage = Math.floor(min + Math.random()*(max-min));
            this.playerHealth -= damage;
            this.logs.unshift({
                isPlayer: false,
                text: 'Monster hits player for ' + damage
            });
        },
        win(){
            if(this.playerHealth < 0){
                this.playerHealth = 0;
                this.isRunning = false;
                Swal.fire({
                    icon: 'error',
                    title: 'You lost !!!',
                  })
                return true;
            };
            if(this.monsterHealth < 0){
                this.monsterHealth = 0;
                this.isRunning = false;
                Swal.fire({
                    icon: 'success',
                    title: 'You won !!!',
                  })
                return true;
            };
            return false;
        }
    }
});