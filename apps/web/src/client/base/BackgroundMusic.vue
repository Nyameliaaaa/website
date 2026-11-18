<template>
	<div class="macchiato fixed right-6 bottom-6 z-50">
		<button class="bg-ctp-base text-ctp-text rounded-md p-2 text-lg drop-shadow-md" @click="() => toggle()">
			<Icon
				:icon="musicPlaying && confirmedPlayState ? 'mdi:pause' : 'mdi:play'"
				size="48"
				:title="musicPlaying && confirmedPlayState ? 'pause the song' : 'play the song'"
			/>
		</button>
	</div>

	<audio
		ref="audioElement"
		src="/gimme_x_gimme.mp3"
		preload="auto"
		@timeupdate="saveTime"
		@ended="handleEnd"
		loop
	></audio>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { Icon } from '@iconify/vue';
import { useStorage } from '@vueuse/core';

const audioElement = ref<HTMLAudioElement | null>(null);
const musicPlaying = useStorage('music-playing', true);
const musicTime = useStorage('music-time', 0, sessionStorage);
const confirmedPlayState = ref(false);

const confirmPlaying = () => {
	if (!confirmedPlayState.value) {
		confirmedPlayState.value = true;
	}
};

const saveTime = () => {
	if (!audioElement.value) return;
	musicTime.value = audioElement.value.currentTime;
};

const handleEnd = () => {
	musicPlaying.value = false;
	musicTime.value = 0;
};

const play = () => {
	if (!audioElement.value) return;

	audioElement.value
		.play()
		.then(() => {
			musicPlaying.value = true;
		})
		.catch(error => {
			console.warn('no autoplay!', error);
			musicPlaying.value = false;
		});

	musicPlaying.value = true;
};

const pause = () => {
	if (!audioElement.value) return;

	audioElement.value.pause();
	musicPlaying.value = false;
};

const toggle = () => {
	confirmPlaying();
	musicPlaying.value ? pause() : play();
};

const handleFirstClick = (event: PointerEvent) => {
	if (musicPlaying.value) {
		confirmPlaying();
		play();
	}

	document.removeEventListener('click', handleFirstClick);
};

onMounted(() => {
	if (audioElement.value) {
		audioElement.value.currentTime = musicTime.value;
	}

	document.addEventListener('click', handleFirstClick);
});

onUnmounted(() => {
	document.removeEventListener('click', handleFirstClick);
});
</script>
