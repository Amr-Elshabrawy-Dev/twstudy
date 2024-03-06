/* -------------------------------------------- */
/*                  Page Loader                 */
/* -------------------------------------------- */

window.addEventListener('load', () => {
  const loader = document.querySelector(".js-page-loader");
  loader.classList.add("face-out");
  setTimeout(() => {
    loader.style.display = "none"
  },60)
})



/* -------------------------------------------- */
/*                  Header Menu                 */
/* -------------------------------------------- */

function headerMenu() {
  const menu = document.querySelector(".js-header-menu");
  const backdrop = document.querySelector(".js-header-backdrop");
  const menuCollapseBreakPoint = 991;

  function toggleMenu() {
    menu.classList.toggle('open');
    backdrop.classList.toggle('active')
    document.body.classList.toggle('overflow-hidden');
  }

  document.querySelectorAll(".js-header-menu-toggler").forEach((item) => {
    item.addEventListener("click", toggleMenu);
  })

  // close the menu by clicking outside of it
  backdrop.addEventListener("click", toggleMenu);

  function collapse() {
    menu.querySelector(".active .js-sub-menu").removeAttribute("style");
    menu.querySelector(".active").classList.remove("active");
  }

  menu.addEventListener("click", (event) => {
    const { target } = event;

    if (
      target.classList.contains("js-toggle-sub-menu") &&
      window.innerWidth <= menuCollapseBreakPoint
    ) {
      /* --- Prevent Default Anchor Click Behavior -- */
      event.preventDefault();

      // if menu-item already expanded, collapse it and exit
      if (target.parentElement.classList.contains("active")) {
        collapse();
        return;
      }
      // if not already expanded, run below code

      // collapse the other expanded menu-item if exists
      if (menu.querySelector(".active")) {
        collapse();
      }

      /* ----------- Expand New Menu-item ----------- */
      target.parentElement.classList.add("active");
      target.nextElementSibling.style.maxHeight = target.nextElementSibling.scrollHeight + "px";
    }
  });

  // when resize window
  window.addEventListener("resize", function() {
    if (this.innerWidth > menuCollapseBreakPoint && menu.classList.contains('open')) {
      toggleMenu()
    }
    if (this.innerWidth > menuCollapseBreakPoint && menu.querySelector('.active')) {
      collapse()
    }
  })
}

headerMenu();

/* -------------------------------------------- */
/*              Testimonial Slider              */
/* -------------------------------------------- */

function testimonialSlider() {
  const carouselOne = document.getElementById("carouselOne");
  /* if the element exists */
  if (carouselOne) {
    carouselOne.addEventListener("slid.bs.carousel", function () {
      const activeItem = this.querySelector(".active");
      document.querySelector(".js-testimonial-img").src =
        activeItem.getAttribute("data-js-testimonial-img");
    });
  }
}

testimonialSlider();

/* -------------------------------------------- */
/*             Course Preview Video             */
/* -------------------------------------------- */

function coursePreviewVideo() {
  const coursePreviewModal = document.querySelector(".js-course-preview-modal");
  if (coursePreviewModal) {
    coursePreviewModal.addEventListener("shown.bs.modal", function () {
      this.querySelector(".js-course-preview-video").play();
      this.querySelector(".js-course-preview-video").currentTime = 0;
    });
    coursePreviewModal.addEventListener("hide.bs.modal", function () {
      this.querySelector(".js-course-preview-video").pause();
    });
  }
}

coursePreviewVideo();

/* -------------------------------------------- */
/*                Style Switcher                */
/* -------------------------------------------- */

function styleSwitcherToggle() {
  const styleSwitcher = document.querySelector(".js-style-switcher");
  const styleSwitcherToggler = document.querySelector(".js-style-switcher-toggler");
  styleSwitcherToggler.addEventListener("click", function () {
    styleSwitcher.classList.toggle("open");
    this.querySelector("i").classList.toggle("fa-times");
    this.querySelector("i").classList.toggle("fa-cog");
  });
}

styleSwitcherToggle();

/* -------------------------------------------- */
/*                 Theme Colors                 */
/* -------------------------------------------- */

function themeColors() {
  const colorStyles = document.querySelector(".js-color-style");
  const themeColorsContainer = document.querySelector(".js-theme-colors");

  themeColorsContainer.addEventListener("click", ({ target }) => {
    if (target.classList.contains("js-theme-color-item")) {
      localStorage.setItem("color", target.getAttribute("data-js-theme-color"));
      setColor();
    }
  });
  function setColor() {
    let path = colorStyles.getAttribute("href").split("/");
    path = path.slice(0, path.length - 1);
    colorStyles.setAttribute("href", path.join("/") + "/" + localStorage.getItem("color") + ".css");
    let jsThemeColorItem = document.querySelector(".js-theme-color-item.active");
    if (jsThemeColorItem) {
      jsThemeColorItem.classList.remove("active");
    }
    document
      .querySelector("[data-js-theme-color=" + localStorage.getItem("color") + "]")
      .classList.add("active");
  }
  if (localStorage.getItem("color") !== null) {
    setColor();
  } else {
    const defaultColor = colorStyles.getAttribute("href").split("/").pop().split(".").shift();
    document.querySelector("[data-js-theme-color=" + defaultColor + "]").classList.add("active");
    console.log("🚀 ~ themeColors ~ defaultColor:", defaultColor);
  }
}

themeColors();

/* -------------------------------------------- */
/*           Theme Light & Theme Dark           */
/* -------------------------------------------- */

function themeLightDark() {
  const darkModeCheckBox = document.querySelector(".js-dark-mode");

  darkModeCheckBox.addEventListener("click", function () {
    if (this.checked) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
    themeMode();
  });

  themeMode();
  function themeMode() {
    if (localStorage.getItem("theme") === "light") {
      darkModeCheckBox.checked = false;
      document.body.classList.remove("dark");
    } else if (localStorage.getItem("theme") === "dark") {
      darkModeCheckBox.checked = true;
      document.body.classList.add("dark");
    }
  }
}

themeLightDark();

/* -------------------------------------------- */
/*              Theme Glass Effect              */
/* -------------------------------------------- */

function themeGlassEffect() {
  const glassEffectCheckBox = document.querySelector(".js-glass-effect");
  const glassStyle = document.querySelector(".js-glass-style");
  glassEffectCheckBox.addEventListener("click", function () {
    if (this.checked) {
      localStorage.setItem("glass-effect", "true");
    } else {
      localStorage.setItem("glass-effect", "false");
    }
    glass();
  });

  function glass() {
    if (localStorage.getItem("glass-effect") === "true") {
      glassStyle.removeAttribute("disabled");
    } else {
      glassStyle.disabled = true;
    }
  }

  if (localStorage.getItem("glass-effect") !== null) {
    glass();
  }
  if (!glassStyle.hasAttribute("disabled")) {
    glassEffectCheckBox.checked = true;
  }
}

themeGlassEffect();
