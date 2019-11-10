$(function () {

    /* Tests suite for RSS Feeds definition
    *  the allFeeds variable in the application.
    */

    describe('RSS Feeds', function () {

        /* Test 1: Test if RSS sources are defined properly into feedsUrls array.
         * and not empty.        
         */

        it('are defined', function () {
            expect(feedsUrls).toBeDefined();
            expect(feedsUrls.length).not.toBe(0);
        });

        /* Test 2: Test to loop through feedsUrls array's object "feed"
         * to check if it has a URL defined and URL is not empty.
         */

        it('has an URL defined and not empty', function () {
            for (feed of feedsUrls) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            };
        });

        /* Test 3: Test to loop through feedsUrls array's object "feed"
         * to check if it has a name defined and name is not empty.
         */

        it('has an name defined and not empty', function () {
            for (feed of feedsUrls) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            };
        });
    });

    /* Test suite 2: Tests suite for "The menu" */
    describe('The menu', function () {
        let body = document.getElementsByTagName('body')[0];

        /* Test 4: Test to check if menu element is hidden by default.
             * The menu visibility is determined by <body> 'menu-hidden' class. 
             * This test checks if menu is present in <body> by default to hide menu.
             */
        it('is hidden by default', function () {
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });
        /* Test 5: Test to check if menu changes visibility, when menu icon is clicked. 
             * Includes two expectations: menu displays when menu icon is clicked
             * and menu hide when menu icon is clicked again.
             */
        it('change visibility when the icon is clicked', function () {
            let menuIcon = document.getElementsByClassName('menu-icon-link')[0];

            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);

            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });
    });

    /* Test suite 3: Test suite for "Initial Entries" 
 * To check if single entries are loaded properly into HTML
 */
    describe('Initial Entries', function () {

        /* Test 6: Write a test to ensure after loadFeed function is called
         * and completed, at least one .entry element within .feed container displays.
         * IMPORTANT: loadFeed() is asynchronous. So, this test requires
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function (done) {
            loadFeed(0, done);
        });

        it('are loaded within the .feed container', function () {

            let feedEntries = document.querySelector('.feed').querySelectorAll('.entry');
            expect(feedEntries.length).toBeGreaterThan(0);
        });

    });

    /* Test suite 4: Test suite for "New Feed Selection" 
 * to check if page refreshes when new feed set is selected
 * Test 7: Store HTML content in "oldFeeds" variable and
 * Store HTML content of new feed in "newFeeds" variable
 */
    describe('New Feed Selection', function () {
        let oldFeeds;
        let newFeeds;

        beforeEach(function (done) {
            loadFeed(0, function () { // Load first new feeds set

                oldFeeds = document.getElementsByClassName('feed')[0].innerHTML;
                loadFeed(1, function () { // Load second new feeds set

                    newFeeds = document.getElementsByClassName('feed')[0].innerHTML;
                    done();
                });
            });
        });

        /* Test 8: Test to compare content of oldFeeds and newFeeds variables.
         * When a new feed is loaded by the loadFeed function, the content should change.
         * Also HTML content must change, so variables should differ.
         * IMPORTANT: loadFeed() is asynchronous.
         */
        it('is correctly loaded within .feed container', function () {
            expect(newFeeds).not.toEqual(oldFeeds);
        });
    });


    /* Test suite 5: Test suite for "Feed Properties"
* To check rss feed properties defined
*/
    describe('Feed Properties', function () {

        /* Test 9: Write a test to ensure after loadFeed function is called
         * and completed, at least one .entry element within .feed container displays.
         * IMPORTANT: loadFeed() is asynchronous. So, this test requires
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        beforeEach(function (done) {
            loadFeed(0, done);
        });

        it('has an title defined and not empty ', function () {
            expect(feedContents.title).toBeDefined();
            expect(feedContents.title.length).not.toBe(0);
        });

        it('has an description defined and not empty', function () {
            expect(feedContents.description).toBeDefined();
            expect(feedContents.description.length).not.toBe(0);
        });

        it('has an link defined and not empty', function () {
            expect(feedContents.link).toBeDefined();
            expect(feedContents.link.length).not.toBe(0);
        });

        it('has an author defined and not empty', function () {
            expect(feedContents.author).toBeDefined();
            expect(feedContents.author.length).not.toBe(0);
        });
    });

}());
