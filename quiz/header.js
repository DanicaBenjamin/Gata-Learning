
window.addEventListener("DOMContentLoaded", () => {
document.querySelector(".minimize")?.addEventListener("click", () => {
    console.log("MIN CLICKED");
    window.windowControls.minimize();
});    const close = document.querySelector(".close");
const min = document.querySelector(".close");

    console.log("windowControls:", window.windowControls); // 👈 DEBUG

    min?.addEventListener("click", () => {
        console.log("minimize clicked");
        window.windowControls?.minimize();
    });

    close?.addEventListener("click", () => {
        console.log("close clicked");
        window.windowControls?.close();
    });
});

const click = document.querySelector('.click');
if(click) {
    click.addEventListener('click', function() {
        window.location.href = "subject.html";
    });
}

const ic = document.querySelector('.ICCA');
if(ic) {
    ic.addEventListener('click', function() {
        window.location.href = "ICCA.html";
    });
}

const ca = document.querySelector('.CA');
if(ca) {
    ca.addEventListener('click', function() {
        window.location.href = "CA.html";
    });
}

const ds = document.querySelector('.DS');
if(ds) {
    ds.addEventListener('click', function() {
        window.location.href = "DS.html";
    });
}

const ad = document.querySelector('.ADD');
if(ad) {
    ad.addEventListener('click', function() {
        window.location.href = "ADD.html";
    });
}

const qe = document.querySelector('.QE');
if(qe) {
    qe.addEventListener('click', function() {
        window.location.href = "CA.html";
    });
}

const pe = document.querySelector('.PE');
if(pe) {
    pe.addEventListener('click', function() {
        window.location.href = "PE.html";
    });
}
