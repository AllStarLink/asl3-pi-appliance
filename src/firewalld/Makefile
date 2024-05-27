sysconfdir		?= /etc
firewallddir	?= $(sysconfdir)/firewalld
firewall_svcs	?= $(firewallddir)/services
firewall_zones	?= $(firewallddir)/zones

FIREWALLD_SERVICES = $(wildcard services/*.xml)
FIREWALLD_ZONES = $(wildcard zones/*.xml)

FIREWALLD_INSTALLABLES = $(patsubst %, $(DESTDIR)$(firewall_svcs)/%, $(FIREWALLD_SERVICES)) $(patsubst %, $(DESTDIR)$(firewall_zones)/%, $(FIREWALLD_ZONES))

INSTALLABLES = $(FIREWALLD_INSTALLABLES) 

.PHONY:	install
install:	$(INSTALLABLES)

$(DESTDIR)$(firewall_svcs)/%:	%
	install -D -m 0644  $< $@

$(DESTDIR)$(firewall_zones)/%:	%
	install -D -m 0644  $< $@


