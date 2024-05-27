sysconfdir	?= /etc
avahidir	?= $(sysconfdir)/avahi
avahisvcs	?= $(avahidir)/services

AVAHI_SERVICES = $(wildcard services/*.service)
AVAHI_INSTALLABLES = $(patsubst services/%, $(DESTDIR)$(avahisvcs)/%, $(AVAHI_SERVICES))

INSTALLABLES = $(AVAHI_INSTALLABLES) 

.PHONY:	install
install:	$(INSTALLABLES)

$(DESTDIR)$(avahisvcs)/%:	services/%
	install -D -m 0644  $< $@


