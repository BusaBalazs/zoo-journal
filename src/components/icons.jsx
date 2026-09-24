// A small hand-picked set of monoline icons, drawn to match the
// field-journal aesthetic instead of pulling in an icon library.

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function IconHome({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M4 11.5 12 4l8 7.5" />
      <path d="M6 10.5V20h12v-9.5" />
      <path d="M10 20v-5.5h4V20" />
    </svg>
  );
}

export function IconCompass({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <circle cx="12" cy="12" r="8.2" />
      <path d="M14.6 9.4 13 13l-3.6 1.6L11 11l3.6-1.6Z" />
    </svg>
  );
}

export function IconBook({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M4 5.2c1.8-.9 4.3-.9 6 0v13.6c-1.7-.9-4.2-.9-6 0Z" />
      <path d="M20 5.2c-1.8-.9-4.3-.9-6 0v13.6c1.7-.9 4.2-.9 6 0Z" />
    </svg>
  );
}

export function IconPaw({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <ellipse cx="12" cy="16.2" rx="4.6" ry="3.6" />
      <ellipse cx="6.3" cy="10.6" rx="1.7" ry="2.2" />
      <ellipse cx="17.7" cy="10.6" rx="1.7" ry="2.2" />
      <ellipse cx="9.3" cy="7.3" rx="1.5" ry="2" />
      <ellipse cx="14.7" cy="7.3" rx="1.5" ry="2" />
    </svg>
  );
}

export function IconCamera({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M4 8.5c0-.8.6-1.4 1.4-1.4h2l1-1.6h7l1 1.6h2.2c.8 0 1.4.6 1.4 1.4V18c0 .8-.6 1.4-1.4 1.4H5.4C4.6 19.4 4 18.8 4 18Z" />
      <circle cx="12" cy="12.7" r="3.3" />
    </svg>
  );
}

export function IconExpand({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M8 4H4v4M16 4h4v4M20 16v4h-4M4 16v4h4" />
      <path d="M4 4l6 6M20 4l-6 6M20 20l-6-6M4 20l6-6" />
    </svg>
  );
}

export function IconLeaf({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M6 18c-1.2-6.4 2.6-11.6 12-12 .6 9-4.4 13-12 12Z" />
      <path d="M6.5 17.5 15 9" />
    </svg>
  );
}

export function IconPin({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 21s6.5-6.1 6.5-11.2a6.5 6.5 0 1 0-13 0C5.5 14.9 12 21 12 21Z" />
      <circle cx="12" cy="9.7" r="2.1" />
    </svg>
  );
}

export function IconClock({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <circle cx="12" cy="12" r="8.2" />
      <path d="M12 7.6V12l3 2" />
    </svg>
  );
}

export function IconCheck({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M5 12.5 9.5 17 19 7" />
    </svg>
  );
}

export function IconArrowLeft({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M15 5 8 12l7 7" />
    </svg>
  );
}

export function IconChevronRight({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M9.5 5 16.5 12l-7 7" />
    </svg>
  );
}

export function IconQr({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <rect x="4" y="4" width="6" height="6" rx="1" />
      <rect x="14" y="4" width="6" height="6" rx="1" />
      <rect x="4" y="14" width="6" height="6" rx="1" />
      <path d="M15 15h2.2v2.2H15zM18.5 15h1.5M15 18.5h1.5M18.7 18.7h.8" />
    </svg>
  );
}

export function IconPlus({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 5.5v13M5.5 12h13" />
    </svg>
  );
}

export function IconX({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export function IconEdit({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M5 19.2 5.6 16 15.8 5.8a1.7 1.7 0 0 1 2.4 2.4L8 18.4l-3.2.8Z" />
    </svg>
  );
}

export function IconDots({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <circle cx="5.5" cy="12" r="1.6" />
      <circle cx="12" cy="12" r="1.6" />
      <circle cx="18.5" cy="12" r="1.6" />
    </svg>
  );
}

export function IconShield({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 4 5 6.6v5.2c0 4.6 3 7.6 7 8.6 4-1 7-4 7-8.6V6.6Z" />
      <path d="m9.2 12 1.9 1.9 3.7-3.9" />
    </svg>
  );
}

export function IconWalk({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <circle cx="14.2" cy="5.4" r="1.7" fill="currentColor" stroke="none" />
      <path d="M12.5 9 9.5 11l1 4-3 5M12.5 9l3 1.5.8 4.5 3 3.5M9.5 11l3.4 1" />
    </svg>
  );
}

export function IconFork({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M8 4v6a2 2 0 0 0 4 0V4M10 10v10M16 4c-1.4 0-2.4 1.6-2.4 4.4 0 2 .9 3.3 2.4 3.6V20" />
    </svg>
  );
}

export function IconEye({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M3.5 12S7 6 12 6s8.5 6 8.5 6-3.5 6-8.5 6-8.5-6-8.5-6Z" />
      <circle cx="12" cy="12" r="2.6" />
    </svg>
  );
}

export function IconSparkle({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 4.5c.6 3 1.9 4.3 4.9 4.9-3 .6-4.3 1.9-4.9 4.9-.6-3-1.9-4.3-4.9-4.9 3-.6 4.3-1.9 4.9-4.9Z" />
      <path d="M18.5 15.5c.3 1.4.9 2 2.3 2.3-1.4.3-2 .9-2.3 2.3-.3-1.4-.9-2-2.3-2.3 1.4-.3 2-.9 2.3-2.3Z" />
    </svg>
  );
}

export function IconSearch({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <circle cx="10.8" cy="10.8" r="6.3" />
      <path d="m19.5 19.5-4-4" />
    </svg>
  );
}

export function IconHeart({ className = "w-5 h-5", filled = false }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      {...base}
      fill={filled ? "currentColor" : "none"}
    >
      <path d="M12 20s-7.4-4.5-9.7-9C.7 7.4 2.5 4 6 4c2 0 3.5 1.1 6 3.7C14.5 5.1 16 4 18 4c3.5 0 5.3 3.4 3.7 7-2.3 4.5-9.7 9-9.7 9Z" />
    </svg>
  );
}

export function IconQuestion({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M9.6 9.4a2.4 2.4 0 1 1 3.4 2.2c-.9.5-1 1-1 1.9" />
      <circle
        cx="12"
        cy="16.8"
        r="0.15"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

export function IconBulb({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M9 17.5h6M9.8 20h4.4" />
      <path d="M12 3.5a5.8 5.8 0 0 0-3.4 10.5c.6.5.9 1 .9 1.7h5a2 2 0 0 1 .9-1.7A5.8 5.8 0 0 0 12 3.5Z" />
    </svg>
  );
}

export function IconUser({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <circle cx="12" cy="8.2" r="3.4" />
      <path d="M5 20c1-3.6 4-5.6 7-5.6s6 2 7 5.6" />
    </svg>
  );
}

export function IconMoon({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M19 13.5A7.5 7.5 0 1 1 10.5 5 6 6 0 0 0 19 13.5Z" />
    </svg>
  );
}

export function IconPlay({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <circle cx="12" cy="12" r="8.2" />
      <path d="M10.3 8.7 15 12l-4.7 3.3Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconEyeOff({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M4 4.5 20 19.5" />
      <path d="M8.9 6.6C9.9 6.2 10.9 6 12 6c5 0 8.5 6 8.5 6a15 15 0 0 1-3.2 3.8M6.6 8.2A15.4 15.4 0 0 0 3.5 12s3.5 6 8.5 6c1 0 1.9-.2 2.8-.5" />
      <path d="M10.2 10.3a2.6 2.6 0 0 0 3.6 3.6" />
    </svg>
  );
}

export function IconChevronDown({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="m6 9.5 6 6 6-6" />
    </svg>
  );
}

export function IconMap({ className = "w-8 h-8" }) {
  return (
    <svg viewBox="0 0 48 48" className={className}>
      <rect
        x="5"
        y="8"
        width="38"
        height="28"
        rx="6"
        fill="currentColor"
        opacity="0.12"
      />
      <path
        d="M12 14v22M22 12v22M32 14v22"
        stroke="currentColor"
        strokeWidth="1.4"
        opacity="0.45"
        strokeLinecap="round"
      />
      <path
        d="M9 20h30M9 28h30"
        stroke="currentColor"
        strokeWidth="1.4"
        opacity="0.45"
        strokeLinecap="round"
      />
      <path
        d="M28 21c0 5.5-6.5 11-6.5 11S15 26.5 15 21a6.5 6.5 0 0 1 13 0Z"
        fill="currentColor"
      />
      <circle cx="21.5" cy="21" r="2.4" fill="white" />
    </svg>
  );
}

export function IconBinoculars({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M9.5 10.5 8 5h3l1 5.5M14.5 10.5 16 5h-3l-1 5.5" />
      <circle cx="8" cy="15.5" r="3.2" />
      <circle cx="16" cy="15.5" r="3.2" />
      <path d="M11 15h2" />
    </svg>
  );
}

export function IconBpZoo({ className = "w-5 h-5" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="129.406"
      height="195"
      viewBox="0 0 129.406 195"
    >
      <g transform="translate(733 55)">
        <path
          d="M0,0H129.406a0,0,0,0,1,0,0V130.3A64.7,64.7,0,0,1,64.7,195h0A64.7,64.7,0,0,1,0,130.3V0A0,0,0,0,1,0,0Z"
          transform="translate(-733 -55)"
          fill="#fff"
        />
        <g transform="translate(-702.02 -15.504)">
          <path
            d="M163.632,70.148a1.963,1.963,0,1,1,1.958-1.964,1.963,1.963,0,0,1-1.958,1.964m-6.256-18.466c-6.893,0-11.213,2.866-13.6,6.066a11.42,11.42,0,0,0-2.305,8.723A12.2,12.2,0,0,0,154.328,76.49a1.071,1.071,0,0,1,1.163,1.014,1.084,1.084,0,0,1-1.012,1.163c-.335.029-.67.039-1,.039a14.387,14.387,0,0,1-14.153-11.844,13.539,13.539,0,0,1,2.553-10.209A26.634,26.634,0,0,0,130.7,78.359a21.686,21.686,0,0,0,4.828,13.109c0,3.071,0,2.31,0,5.033h7.437V89.965a1.094,1.094,0,0,1,2.188,0V96.5h7.409V87.927a1.1,1.1,0,0,1,2.191,0V96.5h6.766a15.408,15.408,0,0,1,10.368-15.317,13.513,13.513,0,0,0-2.621-5.435,1.094,1.094,0,0,1,1.708-1.368,15.8,15.8,0,0,1,1.216,17.988,13.417,13.417,0,0,1-3.87,4.132h8.6a26.669,26.669,0,0,0-19.538-44.819"
            transform="translate(-130.7 -26.21)"
            fill="#498424"
          />
          <path
            d="M155.408,53.988a28.832,28.832,0,0,1,22.408,47h14.308l0-30.018c0-29.135-26.691-40.274-26.691-40.274S144.416,39.757,139.9,61.156c.052-.074.106-.149.166-.225,2.531-3.4,7.325-6.943,15.345-6.943m6.34,47a13.212,13.212,0,0,1,8.49-13.105c.017.288.036.58.036.867a13.516,13.516,0,0,1-2.239,7.466c-2.959,4.482-6.287,4.772-6.287,4.772"
            transform="translate(-128.732 -30.7)"
            fill="#f9b223"
          />
          <g transform="translate(4.436 74.734)">
            <path
              d="M136.224,99.355h1.508c1.029,0,1.666-.246,1.666-1.066,0-1.5-1.936-2.171-3.173-2.269Zm0-4.56a6.117,6.117,0,0,1,2.194.442,1.106,1.106,0,0,0,.625-.945c0-.453-.282-.649-1.091-.649h-1.728Zm2.562-2.475c1.4,0,1.8.807,1.8,1.7a2.132,2.132,0,0,1-.93,1.851,3.234,3.234,0,0,1,1.361,2.462,2.374,2.374,0,0,1-2.378,2.415h-2.893c-.807,0-1.066-.244-1.066-.834V93.154c0-.466.259-.834.674-.834Z"
              transform="translate(-134.284 -92.247)"
              fill="#222"
            />
            <path
              d="M141.324,93.148c.036-.418.232-.858.734-.858a.7.7,0,0,1,.736.711c0,1.617-.38,3.21-.38,4.828a1.63,1.63,0,0,0,3.26,0c0-1.618-.38-3.211-.38-4.828a.7.7,0,0,1,.737-.711c.5,0,.7.441.734.858l.354,3.8c.026.318.026.686.026,1.031a3.111,3.111,0,0,1-6.2,0c0-.345,0-.713.024-1.031Z"
              transform="translate(-132.943 -92.254)"
              fill="#222"
            />
            <path
              d="M149.023,99.281h1.189c1.826,0,2.452-.612,2.452-1.938a3.584,3.584,0,0,0-3.641-3.552Zm-1.544-6.006c0-.613.295-.955,1.066-.955,4.572,0,5.86,3.04,5.86,4.914a3.284,3.284,0,0,1-3.274,3.517h-2.562c-.8,0-1.09-.2-1.09-.907Z"
              transform="translate(-131.545 -92.247)"
              fill="#222"
            />
            <path
              d="M156.559,95.96a4.069,4.069,0,0,1,2.463.834l.025-.025a14.968,14.968,0,0,0-1.435-3.039,13.2,13.2,0,0,0-1.213,2.23Zm-.527,1.225a12.956,12.956,0,0,0-.6,2.893.714.714,0,0,1-.748.722c-.662,0-.8-.391-.8-.98a14.037,14.037,0,0,1,1.814-5.614c.7-1.323,1.09-1.947,1.948-1.947.71,0,1.127.624,1.826,1.947a15.515,15.515,0,0,1,1.936,5.614c0,.637-.306.98-.734.98-.613,0-.761-.354-.883-1.016a3.418,3.418,0,0,0-3.445-2.6Z"
              transform="translate(-130.173 -92.26)"
              fill="#222"
            />
            <path
              d="M162.687,95.947c.809-.171,2.868-1.029,2.868-1.777,0-.33-.171-.527-1.079-.527h-1.788Zm-1.544-2.966c0-.392.244-.662.771-.662h3.248a1.7,1.7,0,0,1,1.938,1.74c0,1.593-1.348,2.525-4.412,3.358v2.537a.774.774,0,1,1-1.544,0Z"
              transform="translate(-128.621 -92.247)"
              fill="#222"
            />
            <path
              d="M168.535,94.771h2.94a.7.7,0,1,1,0,1.4h-2.94v3.187H171.6a.7.7,0,1,1,0,1.4h-3.617c-.809,0-1.066-.416-1.066-1.055V93.153c0-.465.257-.832.674-.832H171.6a.7.7,0,1,1,0,1.4h-3.064Z"
              transform="translate(-127.385 -92.247)"
              fill="#222"
            />
            <path
              d="M174.6,93.79c-.38,0-.589.172-.589.49,0,1.116,4.94.086,4.94,3.5a3,3,0,0,1-3.261,2.967h-2.633a.738.738,0,1,1,0-1.47h2.009c1.593,0,2.268-.393,2.268-1.436,0-2.241-4.94-.453-4.94-3.541,0-1.275.969-1.985,2.5-1.985h2.536a.738.738,0,1,1,0,1.47Z"
              transform="translate(-126.241 -92.247)"
              fill="#222"
            />
            <path
              d="M181.971,99.956a.774.774,0,1,1-1.543,0V93.79h-1.423a.737.737,0,1,1,0-1.469h4.386a.737.737,0,1,1,0,1.469h-1.42Z"
              transform="translate(-124.969 -92.247)"
              fill="#222"
            />
            <path
              d="M150.669,112.586c0-4.154,3.2-7.713,6.84-7.713s6.839,3.558,6.839,7.713-3.205,7.711-6.839,7.711-6.84-3.558-6.84-7.711m6.84-10.867a10.871,10.871,0,1,0,10.573,10.867,10.6,10.6,0,0,0-10.573-10.867"
              transform="translate(-131.661 -90.236)"
              fill="#222"
            />
            <path
              d="M169.451,112.586c0-4.154,3.2-7.713,6.841-7.713s6.839,3.558,6.839,7.713-3.206,7.711-6.839,7.711-6.841-3.558-6.841-7.711m6.841-10.867a10.871,10.871,0,1,0,10.573,10.867,10.6,10.6,0,0,0-10.573-10.867"
              transform="translate(-127.641 -90.236)"
              fill="#222"
            />
            <path
              d="M147.36,119.857h-9.534a4.5,4.5,0,0,1,.565-1.337,29.3,29.3,0,0,1,4.619-4.8,24.506,24.506,0,0,0,4.016-4.395,7.376,7.376,0,0,0,1.157-6.357,1.572,1.572,0,0,0-1.456-.977H136.594a1.573,1.573,0,0,0,0,3.147h8.493a5.585,5.585,0,0,1-.926,2.468,21.959,21.959,0,0,1-3.506,3.791,31.021,31.021,0,0,0-5.144,5.425c-.974,1.519-1.553,3.873-.84,5.178a1.868,1.868,0,0,0,1.646,1H147.36a1.573,1.573,0,0,0,0-3.147"
              transform="translate(-134.354 -90.177)"
              fill="#222"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
