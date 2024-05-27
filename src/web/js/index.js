window.addEventListener('load', function() {
    const thisHostname = window.location.hostname;
    this.document.getElementById('cockpit-link').href = `https://${thisHostname}:9090`;
    this.document.getElementById('allmon3-link').href = `https://${thisHostname}/allmon3/`;
    this.document.getElementById('node-host').innerHTML = thisHostname;
})