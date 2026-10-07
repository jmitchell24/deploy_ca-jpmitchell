

//
// Matomo 
// 
    
var _paq = window._paq = window._paq || [];
/* tracker methods like "setCustomDimension" should be called before "trackPageView" */
_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);
(function() {
    var u="//matomo.delm.win/";
    _paq.push(['setTrackerUrl', u+'matomo.php']);
    _paq.push(['setSiteId', '1']);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
})();
    

// 
// External Link Fix 
// 
    
document.addEventListener('DOMContentLoaded', function() {
    // Get all links
    const links = document.querySelectorAll('a');

    links.forEach(link => {
        // Check if link is external
        if (link.hostname && link.hostname !== window.location.hostname) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
});
    
// 
// More Link Fixes 
// 

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-internal-href]').forEach(item => {
        const url = item.getAttribute('data-internal-href');
        item.setAttribute('title', url);
        item.addEventListener('click', (e) => {
            window.location.href = url; 
        });

        // Make it keyboard accessible
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'link');

        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                item.click();
            }
        });
    });
});

// 
// Copy Buttons
// 
    
function addCopyButton2(el) { 
    const pre = el.querySelector("pre"); 
    
    const preLangText = pre.getAttribute("data-lang") || "plaintext"; 
    const preCodeText = pre.textContent || pre.innerText; 

    const footer = el.querySelector(".code-footer"); 
    const footerLang = el.querySelector(".code-footer > .code-footer-lang"); 
    const footerCopy = el.querySelector(".code-footer > .code-footer-copy");
    const footerChars = el.querySelector(".code-footer > .code-footer-chars"); 

    footerLang.innerText = preLangText; 
    footerChars.innerText = `${preCodeText.length} chars`; 
    footerCopy.innerText = "click to copy";

    footer.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(pre.textContent || pre.innerText);
            
            // Visual feedback
            const originalText = footerCopy.innerHTML;
            footerCopy.innerHTML = "copied...";
            
            // Reset after 2 seconds
            setTimeout(() => {
                footerCopy.innerHTML = originalText;
            }, 1500);
            
        } catch (err) {
            // Fallback for older browsers
            // ...
        }
    });
}
        
// Function to add copy buttons to all pre elements
function addCopyButtons() {
    document.querySelectorAll(".code-wrapper").forEach((el, idx) => { 
        addCopyButton2(el); 
    });
}

// Run when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addCopyButtons);
} else {
    addCopyButtons();
}

// 
// Theme Controls 
// 
    
const THEME_KEY = "selected-theme"; 

let current_theme = localStorage.getItem(THEME_KEY) || "alt9"; 
    
function setTheme(theme) { 
    document.body.setAttribute("data-theme", theme); 

    document.querySelectorAll("theme-switcher-button").forEach(btn => { 
        const btn_theme = btn.getAttribute("data-theme"); 
        if (btn_theme == theme) 
            btn.classList.add("theme-active"); 
        else 
            btn.classList.remove("theme-active"); 
    });

    localStorage.setItem(THEME_KEY, theme); 
    current_theme = theme; 
}

setTheme(current_theme);
  
//
// Christmas Easter Egg 
// 

// document.addEventListener('DOMContentLoaded', () => {

//     const isChristmas = new Date().getMonth() === 11; // December is month 11 (0-indexed)

//     console.log(isChristmas
//         ? "christmas detected :)"
//         : "christmas not detected :("
//     );

//     if (isChristmas) { 
//         const body = document.querySelector("body")

//         const christmasContainer = document.createElement("div"); 
//         christmasContainer.className = "x-mas-container";
//         body.appendChild(christmasContainer);

//         function createSnowflake() {
//             const snowflake = document.createElement('div');
//             snowflake.className = "x-mas-snowflake";

                

//             const dur = Math.random() * 22 + 7; 

//             snowflake.innerHTML = '❄';
//             snowflake.style.left = Math.random() * 100 + '%';
//             snowflake.style.animationDuration = dur + 's';
//             snowflake.style.fontSize = Math.random() * 2 + 0.5 + 'em';

//             christmasContainer.appendChild(snowflake);

//             setTimeout(() => {
//                 snowflake.remove();
//             }, dur * 1000);
//         }

//         // Create initial snowflakes
//         for (let i = 0; i < 50; i++) {
//             setTimeout(createSnowflake, i * 100);
//         }

//         // Continuously create new snowflakes
//         setInterval(createSnowflake, 200);
//     } 
// });








//
// Settings Popup
//

document.addEventListener('DOMContentLoaded', () => {

    const settingsOverlay = document.querySelector(".x-settings-overlay");
    settingsOverlay.addEventListener("click", (e) => {
        if (e.target === settingsOverlay) {
            history.back();
        }
    });

    document.querySelector("#settings-close").addEventListener("click", () => {
        history.back();
    });

});

//
// Theme List 
//

document.addEventListener('DOMContentLoaded', () => {

    let pageHueIndex = parseInt(localStorage.getItem("theme-hue-index") ?? "7"); 

    const themeItemsColor = document.querySelectorAll(".btn-hue");

    function setActive(el, active) {
        el.classList.toggle("active", active);
        el.setAttribute("aria-pressed", active ? "true" : "false");
    }

    function updatePageHueIndex(idx) { 
        pageHueIndex = idx; 
        localStorage.setItem("theme-hue-index", idx); 
        document.documentElement.style.setProperty("--color-primary-hue", 
            themeItemsColor[pageHueIndex].getAttribute("data-hue")
        );
    }

    function updateThemeItems() { 
        themeItemsColor.forEach((it, idx) => {
            setActive(it, idx == pageHueIndex);
        });
    }

    themeItemsColor.forEach((it, idx) => { 
        it.addEventListener("click", (e) => { 
            updatePageHueIndex(idx);      
            updateThemeItems(); 
        });
    });

    updateThemeItems();
    updatePageHueIndex(pageHueIndex);

    // enable hover transitions only after the stored accent hue has been painted,
    // so the switch from the default hue on load doesn't animate (see _styles-hover.scss)
    requestAnimationFrame(() => requestAnimationFrame(() => {
        document.documentElement.classList.add("hover-transitions");
    }));
});
