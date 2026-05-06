<template>
    <div class="mt-3">
        <MusicGrid v-if="data" :data="migrateDataFormat(data)" @aria="createAria" @alt="createAlt" />
    </div>
</template>

<script setup lang="ts">
import type { MusicGridItem, Playlist } from '@lib/types';
import MusicGrid from '@client/components/MusicGrid.vue';

const migrateDataFormat = (data: Playlist[]): MusicGridItem[] => {
    return data.map(playlist => ({
        name: playlist.name,
        image: playlist.image,
        url: playlist.url,
        secondaryText: playlist.content
    }));
};

const createAria = (item: MusicGridItem) => {
    return `${item.name} by ${item.secondaryText}`;
};

const createAlt = (item: MusicGridItem) => {
    return `${item.name} by ${item.secondaryText}`;
};

const data: Playlist[] = [
    {
        name: 'audible gabe',
        content: 'game OSTs',
        image: '/playlist-covers/audible-gabe.jpg',
        url: 'https://music.youtube.com/playlist?list=PLLkb4ldSNGRuD0f0mJk-5JmZv11vRl4aV'
    },
    {
        name: 'there is estrogen in my headphones',
        content: 'hyperpop',
        image: '/playlist-covers/estrogen.jpg',
        url: 'https://music.youtube.com/playlist?list=PLLkb4ldSNGRsA2JV5zAs7VxUc1MfcGoU6'
    },
    {
        name: 'god is dead and i killed him',
        content: 'heavy metal & friends',
        image: '/playlist-covers/god-is-dead.jpg',
        url: 'https://music.youtube.com/playlist?list=PLLkb4ldSNGRvM1vpVWFq6wIbS7dnijIeh'
    },
    {
        name: 'it was a good day (it was not)',
        content: 'rap',
        image: '/playlist-covers/good-day.jpg',
        url: 'https://music.youtube.com/playlist?list=PLLkb4ldSNGRusVfOLoQ3LVNVUZpTZWmIt'
    },
    {
        name: 'mediocre apple',
        content: 'vocaloid, utaite, jpop & touhou',
        image: '/playlist-covers/mediocre-apple.jpg',
        url: 'https://music.youtube.com/playlist?list=PLLkb4ldSNGRv2fTwCQNh6QPIa4NcOROMG'
    },
    {
        name: 'its not a phase mom',
        content: 'emo, alt rock, grunge & pop punk',
        image: '/playlist-covers/phase.jpg',
        url: 'https://music.youtube.com/playlist?list=PLLkb4ldSNGRsRUoal2lP6feuZoT5x1JOf'
    },
    {
        name: 'songs to totally definitely use as a shock collar pattern',
        content: 'mc, ncs & gd music (affectionate)',
        image: '/playlist-covers/shock-collar.jpg',
        url: 'https://music.youtube.com/playlist?list=PLLkb4ldSNGRuYMq_oq3GR7qkjYHdcx434'
    },
    {
        name: "taylor swift's sleep paralysis demons",
        content: "pop that isn't corporate but not hyper enough for hyperpop",
        image: '/playlist-covers/taylor-swift.jpg',
        url: 'https://music.youtube.com/playlist?list=PLLkb4ldSNGRsMUOs9cc3MwXRwskNqLMUG'
    },
    {
        name: 'i have been kidnapped by drunk uzbek space wizards',
        content: 'folk & power metal',
        image: '/playlist-covers/uzbek-space-wizard.jpg',
        url: 'https://music.youtube.com/playlist?list=PLLkb4ldSNGRthbn6YmUznpFHQ3HN2IQfq'
    },
    {
        name: 'yearning :3',
        content: 'lesbian',
        image: '/playlist-covers/yearning.jpg',
        url: 'https://music.youtube.com/playlist?list=PLLkb4ldSNGRspMHSIA0ZpQB7PaONW7yri'
    }
].sort((a, b) => {
    if (b.name > a.name) return -1;
    if (b.name < a.name) return 1;
    return 0;
});
</script>
