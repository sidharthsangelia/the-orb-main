"use client";

import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  RedditShareButton,
  InstapaperShareButton,
  XIcon,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
  RedditIcon,
  InstapaperIcon,
} from "react-share";

type Props = {
  url: string;
  title: string;
};

export default function SocialShare({ url, title }: Props) {
  return (
    <div className="border-t border-border mt-12 pt-8">
      <h3 className="text-lg font-semibold text-foreground mb-6 text-center">
        Share this article
      </h3>

      <div className="flex justify-center flex-wrap gap-4 sm:gap-5">
        {/* WhatsApp */}
        <WhatsappShareButton url={url} title={title}>
          <WhatsappIcon
            size={42}
            round
            className="hover:opacity-80 transition-opacity"
          />
        </WhatsappShareButton>

        {/* LinkedIn */}
        <LinkedinShareButton url={url} title={title}>
          <LinkedinIcon
            size={42}
            round
            className="hover:opacity-80 transition-opacity"
          />
        </LinkedinShareButton>

        {/* X (Twitter) */}
        <TwitterShareButton url={url} title={title}>
          <XIcon
            size={42}
            round
            className="hover:opacity-80 transition-opacity"
          />
        </TwitterShareButton>

        {/* Facebook */}
        <FacebookShareButton url={url} >
          <FacebookIcon
            size={42}
            round
            className="hover:opacity-80 transition-opacity"
          />
        </FacebookShareButton>

        {/* Reddit */}
        {/* <RedditShareButton url={encodeURI(url)} title={title}>
          <RedditIcon
            size={42}
            round
            className="hover:opacity-80 transition-opacity"
          />
        </RedditShareButton> */}

        {/* Instagram substitute (Instapaper) */}
        {/* react-share doesn’t support Instagram sharing natively (Instagram has no web share API) */}
        {/* We’ll use a styled Instapaper icon to represent it visually */}
        {/* <a
          href={`https://www.instagram.com/?url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Instagram"
        >
          <InstapaperIcon
            size={42}
            round
            className="hover:opacity-80 transition-opacity"
          />
        </a> */}
      </div>
    </div>
  );
}
