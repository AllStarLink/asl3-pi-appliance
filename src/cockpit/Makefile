prefix 			?= /usr
sysconfdir		?= /etc
exec_prefix		?= $(prefix)
bin_prefix		?= $(exec_prefix)/bin
cockpit_etc		?= $(sysconfdir)/cockpit
cockpit_brand	?= $(prefix)/usr/share/cockpit/branding/debian-AllStarLink

ETC_FILES = $(wildcard etc/*.conf)
ETC_INSTALLABLES = $(patsubst etc/%, $(DESTDIR)$(cockpit_etc)/%, $(ETC_FILES))

BRAND_FILES = \
	debian-AllStarLink/branding.css \
	debian-AllStarLink/favicon.ico \
	debian-AllStarLink/logo.png
BRAND_INSTALLABLES = $(patsubst debian-AllStarLink/%, $(DESTDIR)$(cockpit_brand)/%, $(BRAND_FILES))

BRAND_BINS = debian-AllStarLink/fix-os-release
BRAND_BIN_INSTALLABLES = $(patsubst debian-AllStarLink/%, $(DESTDIR)$(cockpit_brand)/%, $(BRAND_BINS))

INSTALLABLES = $(ETC_INSTALLABLES) $(BRAND_INSTALLABLES) $(BRAND_BIN_INSTALLABLES)

.PHONY:	default install

default:
	@echo $(INSTALLABLES)

install:	$(INSTALLABLES)

$(DESTDIR)$(cockpit_etc)/%:	etc/%
	install -D -m 0644 $< $@

$(DESTDIR)$(cockpit_brand)/fix-os-release:	debian-AllStarLink/fix-os-release
	install -D -m 0755 $< $@

$(DESTDIR)$(cockpit_brand)/%:	debian-AllStarLink/%
	install -D -m 0644 $< $@

