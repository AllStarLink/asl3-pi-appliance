sysconfdir		?= /etc
apachedir		?= $(sysconfdir)/apache2
apacheconf		?= $(apachedir)/conf-available

APACHE2_CONF = $(wildcard *.conf)

APACHE2_INSTALLABLES = $(patsubst %, $(DESTDIR)$(apacheconf)/%, $(APACHE2_CONF)) 

INSTALLABLES = $(APACHE2_INSTALLABLES) 

.PHONY:	install
install:	$(INSTALLABLES)

$(DESTDIR)$(apacheconf)/%:	%
	install -D -m 0644  $< $@
