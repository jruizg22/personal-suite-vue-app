/**
 * `mediaTrackerKeys` is a readonly object containing translation keys
 * for the Media Tracker module. These keys are structured hierarchically
 * to match the modules and dialogs in the UI.
 *
 * This object is intended for use with i18n translation functions.
 *
 * @example
 * import { mediaTrackerKeys } from "@/i18nKeys";
 * t(mediaTrackerKeys.youTube.channels.snackbar.new);
 */
export const mediaTrackerKeys = {
    mediaTracker: "mediaTracker.mediaTracker",
    media: "mediaTracker.media",
    youTube: {
        youTube: "mediaTracker.youTube.youTube",
        channels: {
            channels: "mediaTracker.youTube.channels.channels",
            channel: "mediaTracker.youTube.channels.channel",
            createdAt: "mediaTracker.youTube.channels.created_at",
            searchChannels: "mediaTracker.youTube.channels.search_channels",
            channelLink: "mediaTracker.youTube.channels.channel_link",
            dialogs: {
                viewDialog: {
                    title: "mediaTracker.youTube.channels.dialogs.view_dialog.title",
                },
                newDialog: {
                    title: "mediaTracker.youTube.channels.dialogs.new_dialog.title",
                },
                editDialog: {
                    title: "mediaTracker.youTube.channels.dialogs.edit_dialog.title",
                },
                deleteDialog: {
                    title: "mediaTracker.youTube.channels.dialogs.delete_dialog.title",
                    message: "mediaTracker.youTube.channels.dialogs.delete_dialog.message",
                }
            },
            feedback: {
                new: "mediaTracker.youTube.channels.feedback.new",
                edit: "mediaTracker.youTube.channels.feedback.edit",
                delete: "mediaTracker.youTube.channels.feedback.delete",
            }
        },
        videos: {
            videos: "mediaTracker.youTube.videos.videos",
            title: "mediaTracker.youTube.videos.title",
            video: "mediaTracker.youTube.videos.video",
            publishedAt: "mediaTracker.youTube.videos.published_at",
            searchVideos: "mediaTracker.youTube.videos.search_videos",
            videoLink: "mediaTracker.youTube.videos.video_link",
            lastViewed: "mediaTracker.youTube.videos.last_viewed",
            dialogs: {
                viewDialog: {
                    title: "mediaTracker.youTube.videos.dialogs.view_dialog.title",
                },
                newDialog: {
                    title: "mediaTracker.youTube.videos.dialogs.new_dialog.title",
                },
                editDialog: {
                    title: "mediaTracker.youTube.videos.dialogs.edit_dialog.title",
                },
                deleteDialog: {
                    title: "mediaTracker.youTube.videos.dialogs.delete_dialog.title",
                    message: "mediaTracker.youTube.videos.dialogs.delete_dialog.message",
                }
            },
            feedback: {
                new: "mediaTracker.youTube.videos.feedback.new",
                edit: "mediaTracker.youTube.videos.feedback.edit",
                delete: "mediaTracker.youTube.videos.feedback.delete",
            }
        },
        playlists: "mediaTracker.youTube.playlists",
    }
} as const