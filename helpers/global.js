function sleep(ms) {
    var start = performance.now();
    while (performance.now() - start < ms);
}