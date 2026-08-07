(function(){
        var track = document.getElementById('liRecTrack');
        var prevBtn = document.getElementById('liRecPrev');
        var nextBtn = document.getElementById('liRecNext');
        var dotsWrap = document.getElementById('liRecDots');
        if(!track || !prevBtn || !nextBtn || !dotsWrap) return;

        var cards = Array.prototype.slice.call(track.children);
        if(!cards.length) return;

        cards.forEach(function(_, i){
          var dot = document.createElement('button');
          dot.className = 'li-rec-dot' + (i === 0 ? ' active' : '');
          dot.type = 'button';
          dot.setAttribute('aria-label', 'Go to recommendation ' + (i + 1));
          dot.addEventListener('click', function(){
            cards[i].scrollIntoView({ behavior:'smooth', inline:'start', block:'nearest' });
          });
          dotsWrap.appendChild(dot);
        });
        var dots = Array.prototype.slice.call(dotsWrap.children);

        function currentIndex(){
          var trackLeft = track.scrollLeft;
          var closest = 0;
          var closestDist = Infinity;
          cards.forEach(function(card, i){
            var dist = Math.abs(card.offsetLeft - track.offsetLeft - trackLeft);
            if(dist < closestDist){ closestDist = dist; closest = i; }
          });
          return closest;
        }

        function updateDots(){
          var idx = currentIndex();
          dots.forEach(function(d, i){ d.classList.toggle('active', i === idx); });
        }

        function step(dir){
          var idx = currentIndex();
          var next = Math.min(cards.length - 1, Math.max(0, idx + dir));
          cards[next].scrollIntoView({ behavior:'smooth', inline:'start', block:'nearest' });
        }

        prevBtn.addEventListener('click', function(){ step(-1); });
        nextBtn.addEventListener('click', function(){ step(1); });

        var scrollTimer;
        track.addEventListener('scroll', function(){
          clearTimeout(scrollTimer);
          scrollTimer = setTimeout(updateDots, 80);
        });

        updateDots();
      })();