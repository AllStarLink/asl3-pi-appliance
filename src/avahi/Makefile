sysconfdir	?= /etc
avahidir	?= $(sysconfdir)/avahi
avahisvcs	?= $(avahidir)/services

AVAHI_SERVICES = $(wildcard services/*.service)
AVAHI_INSTALLABLES = $(patsubst %, $(DESTDIR)$(avahisvcs)/%, $(AVAHI_SERVICES))

INSTALLABLES = $(AVAHI_INSTALLABLES) 

.PHONY:	install
install:	$(INSTALLABLES)
	@echo $(AVAHI_SERVICES)
	@echo $(AVAHI_INSTALLABLES)

$(DESTDIR)$(avahisvcs)/%:	%
	install -D -m 0644  $< $@


