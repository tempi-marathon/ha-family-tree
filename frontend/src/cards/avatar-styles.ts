/** Person avatar styles for the cards bundle (panel styles are not shared). */

import { css } from "lit";

export const avatarStyles = css`
  .person-avatar {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    flex-shrink: 0;
    overflow: hidden;
    box-sizing: border-box;
    border: 1px solid var(--divider-color);
    font-weight: 600;
    font-size: 0.75rem;
    line-height: 1;
  }
  .person-avatar__inner {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .person-avatar img,
  .person-avatar ft-authenticated-media-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .person-avatar--male.person-avatar--initials {
    background: rgba(33, 150, 243, 0.15);
    color: var(--primary-text-color, #1a1a1a);
  }
  .person-avatar--female.person-avatar--initials {
    background: rgba(233, 30, 99, 0.12);
    color: var(--primary-text-color, #1a1a1a);
  }
  .person-avatar--unknown.person-avatar--initials {
    background: var(--secondary-background-color);
    color: var(--secondary-text-color);
  }
  .person-avatar__deceased-mark {
    position: absolute;
    top: 1px;
    left: 1px;
    z-index: 1;
    color: var(--secondary-text-color);
    filter: drop-shadow(0 0 1px var(--card-background-color, #fff));
    pointer-events: none;
    line-height: 0;
  }
  .person-avatar--md {
    font-size: 0.85rem;
  }
  .person-avatar--detail {
    font-size: 1.1rem;
  }
`;
