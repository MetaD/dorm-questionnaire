'use strict';

jQuery(document).ready(function() {
    if (window.location.search.substring(1).length > 0) {
        let completed = window.location.search.substring(1).split(/[&=]/)[1];
        console.log(completed);
        if ((Date.now() - parseInt(completed)) / 60000 > 720) {  // more than 12 hrs
            $('#end-survey').hide();
        }
    } else {
        $('#end-survey').hide();
    }

    // Firebase
    var firebaseConfig = {
        apiKey: 'AIzaSyBvPWLV2yjapJKblBLcfkVbpZC3cXtM0PU',
        authDomain: 'dorm-network.firebaseapp.com',
        databaseURL: 'https://dorm-network.firebaseio.com',
        projectId: 'dorm-network',
        storageBucket: '',
        messagingSenderId: '804230274072',
        appId: '1:804230274072:web:dd26c12bba4f85e64df76d'
    };
    firebase.initializeApp(firebaseConfig);
    var db = firebase.firestore();

    db.collection('count').doc('count').get().then((doc) => {
        let count = doc.data().count;
        let percent = Math.floor(count/194 * 100);
        $('#bar').css('width', percent + '%').attr('aria-valuenow', percent);
        $('#bar').text(percent + '% have completed');
    })
    .catch(function(error) {
        // error
        alert('Failed to access the database, please check ' +
              'your internet connection and try again.\n' + error);
        console.log(error);
    });

});