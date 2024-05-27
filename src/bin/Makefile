prefix 			?= /usr
exec_prefix		?= $(prefix)
bin_prefix		?= $(exec_prefix)/bin

BIN_FILES = $(filter-out Makefile , $(wildcard *))
BIN_INSTALLABLES = $(patsubst %, $(DESTDIR)$(bin_prefix)/%, $(BIN_FILES))

INSTALLABLES = $(BIN_INSTALLABLES)

.PHONY:	install
install:	$(INSTALLABLES)

$(DESTDIR)$(bin_prefix)/%:	%
	install -D -m 0755  $< $@



