<template>
	<TransitionRoot appear :show="showBadBrowserModal" as="template">
		<Dialog as="div" class="relative z-100">
			<TransitionChild
				as="template"
				enter="duration-300 ease-out"
				enter-from="opacity-0"
				enter-to="opacity-100"
				leave="duration-200 ease-in"
				leave-from="opacity-100"
				leave-to="opacity-0"
			>
				<div class="bg-ctp-crust/90 fixed inset-0" />
			</TransitionChild>

			<div class="fixed inset-0 overflow-y-auto">
				<div class="flex min-h-full items-center justify-center p-4 text-center">
					<TransitionChild
						as="template"
						enter="duration-300 ease-out"
						enter-from="opacity-0 scale-95"
						enter-to="opacity-100 scale-100"
						leave="duration-200 ease-in"
						leave-from="opacity-100 scale-100"
						leave-to="opacity-0 scale-95"
					>
						<DialogPanel
							class="bg-ctp-mantle w-full max-w-xl transform overflow-hidden rounded-md text-left align-middle shadow-sm shadow-black transition-all"
						>
							<p :class="[subHeading, 'p-3 text-center']">amelia</p>
							<div class="bg-ctp-base p-3">
								<div v-if="browserName === 'brave'">
									<DialogTitle as="h1" :class="heading">say no to brave :p</DialogTitle>
									<div class="mt-2 flex flex-col gap-2">
										<DialogDescription as="p" :class="leadText"
											>brave browser is a browser that is actively harmful to you, to queer people, and the open
											web</DialogDescription
										>

										<p :class="body">
											for more info as to why please see
											<a href="https://thelibre.news/no-really-dont-use-brave/" :class="link"
												>this article by libre.news</a
											>, as well as this
											<a
												href="https://www.reddit.com/r/browsers/comments/1j1pq7b/list_of_brave_browser_controversies/"
												:class="link"
												>this amazing post w/ sources</a
											>
										</p>
									</div>
								</div>
								<div v-if="browserName === 'opr'">
									<DialogTitle as="h1" :class="heading">say no to opera (gx) :p</DialogTitle>
									<div class="mt-2 flex flex-col gap-2">
										<DialogDescription as="p" :class="leadText"
											>opera gx is a cringe browser. a CRINGE browser. so cringe they hid OPRGX from the UA its just
											OPR. heres why:</DialogDescription
										>

										<ul :class="['mt-1 list-inside list-disc', body]">
											<li>opera gx has a gooning mode (panic button)</li>
											<li>why does it have sounds</li>
											<li>what IS this</li>
											<li>its alienware as a browser /neg</li>
											<li>also ai features BOOOOO</li>
											<li>also its chromium. as if they couldn't make it worse</li>
										</ul>

										<!-- <p :class="body">
										for more info as to why please see
										<a href="https://thelibre.news/no-really-dont-use-brave/" :class="link"
											>this article by libre.news</a
										>, as well as this
										<a
											href="https://www.reddit.com/r/browsers/comments/1j1pq7b/list_of_brave_browser_controversies/"
											:class="link"
											>this amazing post w/ sources</a
										>
									</p> -->
									</div>
								</div>
							</div>

							<div class="p-3">
								<p :class="caption">
									you will not be able to browse this website until you use another browser, preferrably
									<a href="https://firefox.com" :class="link">mozilla firefox</a>
								</p>
							</div>
							<!-- 
							<div class="mt-4">
								<button
									type="button"
									class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
								>
									Got it, thanks!
								</button>
							</div> -->
						</DialogPanel>
					</TransitionChild>
				</div>
			</div>
		</Dialog>
	</TransitionRoot>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle, DialogDescription } from '@headlessui/vue';
import { body, caption, heading, leadText, link, subHeading } from '@lib/classes';

const showBadBrowserModal = ref(false);

function closeModal() {
	showBadBrowserModal.value = false;
}
function openModal() {
	showBadBrowserModal.value = true;
}

// const isBadBrowser = ref(false);
const browserName = ref('');

onMounted(() => {
	const UA = navigator.userAgent;

	if ('brave' in navigator) {
		openModal();
		browserName.value = 'brave';
	}

	if (UA.includes('OPR')) {
		openModal();
		browserName.value = 'opr';
	}
});
</script>
