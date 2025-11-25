import type {Tab} from '@/types'
import {ChannelsTab} from '@media-tracker/components/pages/youtube/channels'
import {VideosTab} from '@media-tracker/components/pages/youtube/videos'

/**
 * List of YouTube module tabs used in the Media Tracker application.
 *
 * This constant exports the tab configuration consumed by components such as
 * `TabContainer`, `TabContent`, and the YouTube main view (`YouTubeView.vue`).
 *
 * Each tab is represented by a `Tab` object, which includes:
 * - `tabId` — A unique identifier used internally to track the active tab.
 * - `label` — An i18n key that resolves the tab text for the UI.
 * - `component` — The Vue component to render when the tab is active.
 *
 * ## Usage
 * These tabs are typically injected into:
 *
 * ```ts
 * import { tabs } from './path/to/tabs'
 *
 * <TabContainer :tabs="tabs" v-model="activeTab" />
 * <TabContent :tabs="tabs" :activeTab="activeTab" />
 * ```
 *
 * ## Tabs Included
 * - **channels** — Displays the list and management interface for YouTube channels.
 * - **videos** — Displays the list and management interface for YouTube videos.
 *
 * ## Related Types
 * - `Tab` — Describes the structure of each tab item.
 *
 * @see Tab
 */
export const tabs: Tab[] = [
    {tabId: "channels", label: "mediaTracker.youTube.channels.channels", component: ChannelsTab},
    {tabId: "videos", label: "mediaTracker.youTube.videos.videos", component: VideosTab}
]