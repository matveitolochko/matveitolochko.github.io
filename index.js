const init = async () => {
    let WIDTH;
    let HEIGHT;
    const onResize = () => {
        WIDTH = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        HEIGHT = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        console.log(WIDTH, HEIGHT)
    }
    window.addEventListener("resize", onResize);
    onResize();
}

const ICONS = [
    {
        div: {
            right: "25%",
            top: "35%",
            width: "7vw",
            height: "8vh",
        },
        img: { width: "3.5vw" },
        file: "asm.svg",
        name: "asm"
    },
    {
        div: {
            right: "19%",
            top: "25%",
            width: "7vw",
            height: "8vh",
        },
        img: { width: "3vw" },
        offset: 100,
        file: "c.svg",
        name: "c"
    },
    {
        div: {
            left: "35%",
            top: "39%",
            width: "7vw",
            height: "7vh",
        },
        img: { width: "3vw" },
        offset: 30,
        file: "cpp.svg",
        name: "cplusplus"
    },
    {
        div: {
            left: "21%",
            top: "23%",
            width: "7vw",
            height: "8vh",
        },
        img: { width: "3vw" },
        offset: 310,
        file: "css.svg",
        name: "css"
    },
    /*{
        div: {
            left: "15%",
            top: "45%",
            width: "7vw",
            height: "7vh",
        },
        offset: 275,
        img: { width: "3vw" },
        file: "dart.svg",
        name: "dart"
    },*/
    {
        div: {
            right: "20%",
            top: "8%",
            width: "7vw",
            height: "8vh",
        },
        img: { width: "3.5vw" },
        offset: 50,
        file: "deno.svg",
        dark: "deno.dark.svg",
        name: "deno"
    },
    {
        div: {
            right: "35%",
            top: "9%",
            width: "7vw",
            height: "8vh",
        },
        img: { width: "4vw" },
        offset: 30,
        file: "docker.svg",
        name: "docker"
    },
    {
        div: {
            left: "15%",
            top: "5%",
            width: "7vw",
            height: "7vh",
        },
        img: { width: "3vw" },
        file: "flutter.svg",
        name: "flutter"
    },
    {
        div: {
            right: "9%",
            top: "15%",
            width: "7vw",
            height: "7vh",
        },
        img: { width: "3vw" },
        offset: 180,
        file: "git.svg",
        name: "git"
    },
    /*{
        div: {
            left: "25%",
            top: "33%",
            width: "7vw",
            height: "10vh",
        },
        img: { width: "3vw" },
        offset: 30,
        file: "github.svg",
        name: "github"
    },*/
    {
        div: {
            right: "11%",
            top: "30%",
            width: "7vw",
            height: "7vh",
        },
        img: { width: "3vw" },
        offset: 310,
        file: "html.svg",
        name: "html"
    },
    {
        div: {
            left: "30%",
            top: "25%",
            width: "7vw",
            height: "8vh",
        },
        img: { width: "3.5vw" },
        file: "java.svg",
        name: "java"
    },
    {
        div: {
            right: "31%",
            top: "27%",
            width: "7vw",
            height: "7vh",
        },
        img: { width: "3vw" },
        file: "js.png",
        name: "javascript"
    },
    {
        div: {
            left: "23%",
            top: "37%",
            width: "7vw",
            height: "7vh",
        },
        img: { width: "3vw" },
        offset: 30,
        file: "node.svg",
        name: "node"
    },
    {
        div: {
            left: "24%",
            top: "9%",
            width: "7vw",
            height: "8vh",
        },
        img: { width: "3vw" },
        offset: 310,
        file: "python.svg",
        name: "python"
    },
    {
        div: {
            left: "32%",
            top: "12%",
            width: "7vw",
            height: "8vh",
        },
        img: { width: "4vw" },
        file: "rust.png",
        name: "rust"
    },
    {
        div: {
            right: "27%",
            top: "17%",
            width: "7vw",
            height: "7vh",
        },
        img: { width: "3vw" },
        offset: 100,
        file: "ts.svg",
        name: "typescript"
    },
];

const getWidth = () => {
    return Math.max(
        document.documentElement["clientWidth"] || 0,
        document.body["scrollWidth"] || 0,
        document.documentElement["scrollWidth"] || 0,
        document.body["offsetWidth"] || 0,
        document.documentElement["offsetWidth"] || 0
    );
}

const main = async (h) => {
    class DarkModeToggleComponent extends h.HyperLightComponent {
        static name = "darkmode";
        active = false;
        constructor() { super(DarkModeToggleComponent.name); }
        onRender() {
            this.innerHTML = '<i style="font-size: 2.5em" class="bi bi-moon bi-brightness-high-fill" id="darkmode-toggle"></i>';
            const save = globalThis.sessionStorage.getItem(DarkModeToggleComponent.name);
            this.active = save === 'true';
            this.setMode(this.active);
            document.getElementById("darkmode-toggle").addEventListener("click", () => {
                this.active = !this.active;
                this.setMode(this.active);
            });
        }
        setMode(active) {
            globalThis.sessionStorage.setItem(DarkModeToggleComponent.name, '' + active);
            const mod = [document.body, document.getElementById("darkmode-toggle")];
            if (active) {
                mod[0].classList.add("darkmode");
                mod[1].classList.add("bi-moon");
                mod[1].classList.remove("bi-brightness-high-fill");
            } else {
                mod[0].classList.remove("darkmode");
                mod[1].classList.remove("bi-moon");
                mod[1].classList.add("bi-brightness-high-fill");
            }
        }
        onConnect() {
            this.onRender();
        }
    }
    DarkModeToggleComponent.link();
    class SEOComponent extends h.HyperLightComponent {
        static name = "seo";
        static CSS = [
            "position: absolute;",
            "bottom: 0px;",
            "right: 0px;",
            "display: none;",
            "opacity: 0;"
        ];
        constructor() { super(SEOComponent.name); }
        onConnect() { this.onRender(); }
        onRender() {
            this.innerHTML = `<span style="${SEOComponent.CSS.join("")}">${this.innerHTML}</span>`;
        }
    }
    SEOComponent.link();
    class FloatingIconsComponent extends h.HyperLightComponent {
        static name = "floating-icons";
        constructor() {
            super(FloatingIconsComponent.name);
        }
        onRender() {
            let result = "";
            ICONS.forEach(icon => {
                result += this.drawIcon(icon);
            });
            document.body.addEventListener("tick", (delta) => {
                ICONS.forEach(icon => {
                    this.tickIcon(icon, delta.detail);
                });
            });
            this.innerHTML = result;
        }
        onConnect() {
            this.onRender();
        }
        drawIcon(icon) {
            return `
            <div id="floating-${icon.name}-div">
                <style>
                    #floating-${icon.name}-div {
                        top: ${icon.div.top};
                        ${(icon.div.left != undefined ? `left: ${icon.div.left};` : `right: ${icon.div.right};`)}
                        position: absolute;
                        width: ${icon.div.width};
                        height: ${icon.div.height};
                    }
                    #floating-${icon.name}-icon {
                        width: ${icon.img.width};
                    }
                </style>
                <img id="floating-${icon.name}-icon" src="assets/langs/${icon.file}" alt="${icon.name}" />
            </div>`;
        }
        tickIcon(icon, delta) {
            const div = document.getElementById(`floating-${icon.name}-div`);
            const img = document.getElementById(`floating-${icon.name}-icon`);
            if (!div || !img) return;
            if (getWidth() < 1000) {
                div.style.opacity = "0";
                return;
            }
            div.style.opacity = "1";

            function checkColor() {
                if(icon.dark) {
                    if(document.body.classList.contains("darkmode")) {
                        if (img.src == `assets/langs/${icon.dark}`) return;
                        img.src = `assets/langs/${icon.dark}`;
                    } else {
                        if (img.src == `assets/langs/${icon.dark}`) return;
                        img.src = `assets/langs/${icon.file}`;
                    }
                }
            }
            checkColor();

            const offset = icon.offset || 0;
            div.style.transform = `rotate(${delta % 360 + offset}deg)`;
            img.style.transform = `rotate(${-delta % 360 - offset}deg)`;
        }
    }
    FloatingIconsComponent.link();

    let timeDelta = 0;
    const SPEED = 1.0;

    function render() {
        timeDelta += SPEED;
        const event = new CustomEvent("tick", { detail: timeDelta });
        document.body.dispatchEvent(event);
        requestAnimationFrame(render);
    }

    render();
}

init().then(() => import("hyperlight").then(h => main(h)));

