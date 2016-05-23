angular.module('skypeClone').controller('videoCtrl', function($scope, $interval, $state) {
  //SKYLINK AND VIDEO SHARING!! WORKING!!
            var skylink = new Skylink();

            skylink.on('peerJoined', function(peerId, peerInfo, isSelf) {
              if(isSelf) return; // We already have a video element for our video and don't need to create a new one.
              var vid = document.createElement('video');
              vid.autoplay = true;
              vid.muted = true; // Added to avoid feedback when testing locally
              vid.id = peerId;
              document.body.appendChild(vid);
            });

            skylink.on('incomingStream', function(peerId, stream, isSelf) {
              if(isSelf) return;
              var vid = document.getElementById(peerId);
              attachMediaStream(vid, stream);
            });
            skylink.on('peerLeft', function(peerId, peerInfo, isSelf) {
              var vid = document.getElementById(peerId);
              document.body.removeChild(vid);
            });

            skylink.on('mediaAccessSuccess', function(stream) {
              var vid = document.getElementById('myvideo');
              attachMediaStream(vid, stream);
            });

            skylink.init({
              apiKey: '13c2f3f9-73c3-42a4-b13c-3da36e3bd1f2',
              defaultRoom: 'Chat'
            }, function() {
              skylink.joinRoom({
                audio: true,
                video: true
              });
            });

});