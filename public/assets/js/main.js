"use strict";
let isRtl = window.Helpers.isRtl(),
    isDarkStyle = window.Helpers.isDarkStyle(),
    menu, animate, isHorizontalLayout = !1;
document.getElementById("layout-menu") && (isHorizontalLayout = document.getElementById("layout-menu").classList.contains("menu-horizontal")),
    function() {
        document.querySelectorAll("#layout-menu").forEach(function(e) {
            menu = new Menu(e, {
                orientation: isHorizontalLayout ? "horizontal" : "vertical",
                closeChildren: !!isHorizontalLayout,
                showDropdownOnHover: localStorage.getItem("templateCustomizer-" + templateName + "--ShowDropdownOnHover") ? "true" === localStorage.getItem("templateCustomizer-" + templateName + "--ShowDropdownOnHover") : void 0 === window.templateCustomizer || window.templateCustomizer.settings.defaultShowDropdownOnHover
            }), window.Helpers.scrollToActive(animate = !1), window.Helpers.mainMenu = menu
        });
        document.querySelectorAll(".layout-menu-toggle").forEach(e => {
            e.addEventListener("click", e => {
                if (e.preventDefault(), window.Helpers.toggleCollapsed(), config.enableMenuLocalStorage && !window.Helpers.isSmallScreen()) try {
                    localStorage.setItem("templateCustomizer-" + templateName + "--LayoutCollapsed", String(window.Helpers.isCollapsed()))
                } catch (e) {}
            })
        });
        if (document.getElementById("layout-menu")) {
            var t = document.getElementById("layout-menu");
            var n = function() {
                Helpers.isSmallScreen() || document.querySelector(".layout-menu-toggle").classList.add("d-block")
            };
            let e = null;
            t.onmouseenter = function() {
                e = Helpers.isSmallScreen() ? setTimeout(n, 0) : setTimeout(n, 300)
            }, t.onmouseleave = function() {
                document.querySelector(".layout-menu-toggle").classList.remove("d-block"), clearTimeout(e)
            }
        }
        window.Helpers.swipeIn(".drag-target", function(e) {
            window.Helpers.setCollapsed(!1)
        }), window.Helpers.swipeOut("#layout-menu", function(e) {
            window.Helpers.isSmallScreen() && window.Helpers.setCollapsed(!0)
        });
        let e = document.getElementsByClassName("menu-inner"),
            o = document.getElementsByClassName("menu-inner-shadow")[0];
        0 < e.length && o && e[0].addEventListener("ps-scroll-y", function() {
            this.querySelector(".ps__thumb-y").offsetTop ? o.style.display = "block" : o.style.display = "none"
        });
        t = document.querySelector(".style-switcher-toggle");

        function s(n) {
            [].slice.call(document.querySelectorAll("[data-app-" + n + "-img]")).map(function(e) {
                var t = e.getAttribute("data-app-" + n + "-img");
                e.src = assetsPath + "img/" + t
            })
        }
        
        var r = document.querySelector(".dropdown-notifications-all");

        function c(e) {
            "show.bs.collapse" == e.type || "show.bs.collapse" == e.type ? e.target.closest(".accordion-item").classList.add("active") : e.target.closest(".accordion-item").classList.remove("active")
        }
        const d = document.querySelectorAll(".dropdown-notifications-read");
        r && r.addEventListener("click", e => {
            d.forEach(e => {
                e.closest(".dropdown-notifications-item").classList.add("marked-as-read")
            })
        }), d && d.forEach(t => {
            t.addEventListener("click", e => {
                t.closest(".dropdown-notifications-item").classList.toggle("marked-as-read")
            })
        }), document.querySelectorAll(".dropdown-notifications-archive").forEach(t => {
            t.addEventListener("click", e => {
                t.closest(".dropdown-notifications-item").remove()
            })
        }), [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map(function(e) {
            return new bootstrap.Tooltip(e)
        });
        [].slice.call(document.querySelectorAll(".accordion")).map(function(e) {
            e.addEventListener("show.bs.collapse", c), e.addEventListener("hide.bs.collapse", c)
        });
        if (isRtl && Helpers._addClass("dropdown-menu-end", document.querySelectorAll("#layout-navbar .dropdown-menu")), window.Helpers.setAutoUpdate(!0), window.Helpers.initPasswordToggle(), window.Helpers.initSpeechToText(), window.Helpers.initNavbarDropdownScrollbar(), window.addEventListener("resize", function(e) {
                window.innerWidth >= window.Helpers.LAYOUT_BREAKPOINT && document.querySelector(".search-input-wrapper") && (document.querySelector(".search-input-wrapper").classList.add("d-none"), document.querySelector(".search-input").value = ""), document.querySelector("[data-template^='horizontal-menu']") && setTimeout(function() {
                    window.innerWidth < window.Helpers.LAYOUT_BREAKPOINT ? document.getElementById("layout-menu") && document.getElementById("layout-menu").classList.contains("menu-horizontal") && menu.switchMenu("vertical") : document.getElementById("layout-menu") && document.getElementById("layout-menu").classList.contains("menu-vertical") && menu.switchMenu("horizontal")
                }, 100)
            }, !0), !isHorizontalLayout && !window.Helpers.isSmallScreen() && ("undefined" != typeof TemplateCustomizer && window.templateCustomizer.settings.defaultMenuCollapsed && window.Helpers.setCollapsed(!0, !1), "undefined" != typeof config) && config.enableMenuLocalStorage) try {
            null !== localStorage.getItem("templateCustomizer-" + templateName + "--LayoutCollapsed") && "false" !== localStorage.getItem("templateCustomizer-" + templateName + "--LayoutCollapsed") && window.Helpers.setCollapsed("true" === localStorage.getItem("templateCustomizer-" + templateName + "--LayoutCollapsed"), !1)
        } catch (e) {}
    }(), "undefined" != typeof $ && $(function() {
        window.Helpers.initSidebarToggle();
        var t, n, e, o = $(".search-toggler"),
            s = $(".search-input-wrapper"),
            a = $(".search-input"),
            l = $(".content-backdrop");
        o.length && o.on("click", function() {
            s.length && (s.toggleClass("d-none"), a.focus())
        }), $(document).on("keydown", function(e) {
            var t = e.ctrlKey,
                e = 191 === e.which;
            t && e && s.length && (s.toggleClass("d-none"), a.focus())
        }), a.on("focus", function() {
            s.hasClass("container-xxl") && s.find(".twitter-typeahead").addClass("container-xxl")
        }), a.length && (t = function(o) {
            return function(t, e) {
                let n;
                n = [], o.filter(function(e) {
                    if (e.name.toLowerCase().startsWith(t.toLowerCase())) n.push(e);
                    else {
                        if (e.name.toLowerCase().startsWith(t.toLowerCase()) || !e.name.toLowerCase().includes(t.toLowerCase())) return [];
                        n.push(e), n.sort(function(e, t) {
                            return t.name < e.name ? 1 : -1
                        })
                    }
                }), e(n)
            }
        }, a.on("keyup", function() {
            e.update()
        }))
    });