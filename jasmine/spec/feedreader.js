/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    //feeds definitions, the allFeeds variable in our application.
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('urls are defined and not empty', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });

        /* loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('names are defined and not empty', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });

    describe('The menu', function() {

        /*ensures the menu element is hidden by default.*/
        it('is hidden by default', function() {
            expect($(document.body).hasClass('menu-hidden')).toBe(true);
        });

        /* check when menue is click whether
         * menu-hidden is removed and added, respectively */
        it('toggles visibility on icon click', function() {
            $('a.menu-icon-link').click();
            expect(document.body.className).not.toContain('menu-hidden');
            $('a.menu-icon-link').click();
            expect(document.body.className).toContain('menu-hidden');
        });
    });


    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        /* ensures when the loadFeed function is called and completes its work,
         * there is at least a single .entry element within the .feed container */
        it('contains at least one entry in feed', function() {
            expect($('.entry h2')[0]).toBeDefined();
        });
    });

    describe('New Feed Selection', function() {
        var currentFeed;
        var newFeed;
        beforeEach(function(done) {
            loadFeed(0, function() {
                currentFeed = $('.feed').html();
                loadFeed(1, function() {
                    newFeed = $('.feed').html();
                    done();
                });
            });
        });

        /*ensures when a new feed is loaded by the loadFeed function that the content actually changes */
        it('content changes', function() {
            expect(currentFeed).not.toBe(newFeed);

        });
    });
}());
