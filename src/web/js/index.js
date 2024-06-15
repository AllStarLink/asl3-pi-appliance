window.addEventListener('load', function() {
    const thisHostname = window.location.hostname;
    const cockpitLink = this.document.getElementById('cockpit-link');
    cockpitLink.href = `https://${thisHostname}:9090`;
    cockpitLink.target = '_blank';
    const allmon3Link = this.document.getElementById('allmon3-link');
    allmon3Link.href = `https://${thisHostname}/allmon3/`;
    allmon3Link.target = '_blank';
    this.document.getElementById('node-host').innerHTML = thisHostname;
})
