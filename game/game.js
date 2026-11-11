/* Common Sense Code interactive lessons: shared state.
   State lives in the player's browser (localStorage). If storage is blocked
   (private browsing, browser settings), the game runs from an in-memory state. */
(function () {
  var KEY = "csc-game-v1";
  var memory = null;

  function defaults() {
    return { food: { plate: null } };
  }

  function load() {
    try {
      var raw = window.localStorage.getItem(KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        var base = defaults();
        for (var k in parsed) { base[k] = parsed[k]; }
        return base;
      }
    } catch (e) { /* storage unavailable or corrupt: fall through */ }
    return memory || defaults();
  }

  function save(state) {
    memory = state;
    try { window.localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* keep memory copy */ }
  }

  function reset() {
    memory = null;
    try { window.localStorage.removeItem(KEY); } catch (e) { /* nothing to clear */ }
  }

  window.CSC = { load: load, save: save, reset: reset };
})();
