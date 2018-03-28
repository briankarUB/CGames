import cgames


def test_module_version_is_present():
    """ Example test to make sure that a __version__ is specified. """
    assert cgames.__version__ is not None
