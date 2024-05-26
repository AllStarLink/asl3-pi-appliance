#
# Build variables
#
SRCNAME = asl3-pi-appliance
PKGNAME = $(SRCNAME)
RELVER = 1.1
DEBVER = 1
RELPLAT ?= deb$(shell lsb_release -rs 2> /dev/null)

#
# Other variables
#
prefix ?= /usr
bindir ?= $(prefix)/bin
sysconfdir ?= /etc

BIN_FILES = sa818
BIN_INSTALLABLES = $(patsubst %, $(DESTDIR)$(bindir)/%, $(BIN_FILES))

ETC_FILES = \
	avahi/services/http-allmon3.service \
	avahi/services/ssh.service \
	avahi/services/https-allmon3.service \
	avahi/services/https-cockpit.service \
	firewalld/services/astmgr.xml \
	firewalld/services/iax2.xml \
	firewalld/services/rtcm.xml \
	firewalld/zones/allstarlink.xml

ETC_INSTALLABLES = $(patsubst %, $(DESTDIR)$(sysconfdir)/%, $(ETC_FILES))

OTHERS = $(DESTDIR)/var/asl-backups

INSTALLABLES = $(BIN_INSTALLABLES) $(ETC_INSTALLABLES) $(OTHERS)

default:
	@echo This does nothing 

install: $(INSTALLABLES)

$(DESTDIR)$(bindir)/%: src/usr/bin/%
	install -D -m 0755  $< $@

$(DESTDIR)$(sysconfdir)/%: src/etc/%
	install -D -m 0644  $< $@

$(DESTDIR)/var/asl-backups:
	mkdir -p $@
	chmod 0755 $@

deb:	debclean debprep
	debchange --distribution stable --package $(PKGNAME) \
		--newversion $(EPOCHVER)$(RELVER)-$(DEBVER).$(RELPLAT) \
		"Autobuild of $(EPOCHVER)$(RELVER)-$(DEBVER) for $(RELPLAT)"
	dpkg-buildpackage -b --no-sign
	git checkout debian/changelog

debchange:
	debchange -v $(RELVER)-$(DEBVER)
	debchange -r


debprep:	debclean
	(cd .. && \
		rm -f $(PKGNAME)-$(RELVER) && \
		rm -f $(PKGNAME)-$(RELVER).tar.gz && \
		rm -f $(PKGNAME)_$(RELVER).orig.tar.gz && \
		ln -s $(SRCNAME) $(PKGNAME)-$(RELVER) && \
		tar --exclude=".git" -h -zvcf $(PKGNAME)-$(RELVER).tar.gz $(PKGNAME)-$(RELVER) && \
		ln -s $(PKGNAME)-$(RELVER).tar.gz $(PKGNAME)_$(RELVER).orig.tar.gz )

debclean:
	rm -f ../$(PKGNAME)_$(RELVER)*
	rm -f ../$(PKGNAME)-$(RELVER)*
	rm -rf debian/$(PKGNAME)
	rm -f debian/files
	rm -rf debian/.debhelper/
	rm -f debian/debhelper-build-stamp
	rm -f debian/*.substvars
	rm -rf debian/$(SRCNAME)/ debian/.debhelper/
	rm -f debian/debhelper-build-stamp debian/files debian/$(SRCNAME).substvars
	rm -f debian/*.debhelper

	
