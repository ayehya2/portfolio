class DigitalClock {
    constructor() {
        this.headerClock = document.getElementById('header-clock');
        this.footerClock = document.getElementById('footer-clock');
        this.previousTime = '';
        
        this.init();
    }
    
    init() {
        this.updateTime();
        setInterval(() => this.updateTime(), 1000);
    }
    
    updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        
        if (timeString !== this.previousTime) {
            this.animateTimeChange(timeString);
            this.previousTime = timeString;
        }
    }
    
    animateTimeChange(newTime) {
        [this.headerClock, this.footerClock].forEach(clock => {
            if (clock) {
                const currentDigits = clock.textContent.split('');
                const newDigits = newTime.split('');
                
                // Find which digits changed
                const changedIndices = [];
                for (let i = 0; i < newDigits.length; i++) {
                    if (currentDigits[i] !== newDigits[i] && /\d/.test(newDigits[i])) {
                        changedIndices.push(i);
                    }
                }
                
                // Animate changed digits
                if (changedIndices.length > 0) {
                    clock.innerHTML = newTime.split('').map((char, index) => {
                        const isChanged = changedIndices.includes(index);
                        const className = isChanged ? 'digit-flip' : '';
                        return `<span class="${className}">${char}</span>`;
                    }).join('');
                    
                    // Remove animation class after animation completes
                    setTimeout(() => {
                        clock.querySelectorAll('.digit-flip').forEach(digit => {
                            digit.classList.remove('digit-flip');
                        });
                    }, 300);
                } else {
                    clock.textContent = newTime;
                }
            }
        });
    }
    
    formatTime(date) {
        return date.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }
}

// Initialize clock when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.digitalClock = new DigitalClock();
});