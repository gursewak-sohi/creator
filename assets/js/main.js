document.addEventListener('DOMContentLoaded', function() {
var baseSpeed =  60; // pixels per second

      window.onload = function() {
        var scrollAnimation = document.querySelectorAll('.scroll-animation');
        scrollAnimation.forEach(function(animation, lineIndex) {
            var animationUnit = animation.querySelectorAll('.scroll-animation-unit');
            var isReverse = animation.classList.contains('reverse');

            // Use the width of the first h3 as the reference for duration calculation
            var referenceWidth = animationUnit[0].getBoundingClientRect().width;
            var duration = referenceWidth / baseSpeed; // Duration based on the first h3 width

            animationUnit.forEach(function(h3, index) {
                var width = h3.getBoundingClientRect().width;
                var animationName = `red-scroll-${lineIndex}-${index}-${isReverse ? 'reverse' : 'forward'}`;

                createKeyframes(animationName, width, index, isReverse);
                h3.style.animation = `${animationName} ${duration}s linear ${index === 0 ? `-${duration}s` : `-${duration / 2}s`} infinite`;
            });
        });
      };
      
      function createKeyframes(name, width, index, isReverse) {
        var keyframes;

        if (isReverse) {
            if (index === 0) {
                keyframes = `
                    @keyframes ${name} {
                        0% { transform: translateX(-${width}px); }
                        to { transform: translateX(${width}px); }
                    }
                `;
            } else {
                keyframes = `
                    @keyframes ${name} {
                        0% { transform: translateX(-${2 * width}px); }
                        to { transform: translateX(0); }
                    }
                `;
            }
        } else {
            if (index === 0) {
                keyframes = `
                    @keyframes ${name} {
                        0% { transform: translateX(${width}px); }
                        to { transform: translateX(-${width}px); }
                    }
                `;
            } else {
                keyframes = `
                    @keyframes ${name} {
                        0% { transform: translateX(0); }
                        to { transform: translateX(-${2 * width}px); }
                    }
                `;
            }
        }

          dynamicStyleSheet.insertRule(keyframes, dynamicStyleSheet.cssRules.length);
      }
  


      function createStyleElement() {
        var style = document.createElement('style');
        style.type = 'text/css';
        document.head.appendChild(style);
        return style.sheet;
    }

    var dynamicStyleSheet = createStyleElement();
  });