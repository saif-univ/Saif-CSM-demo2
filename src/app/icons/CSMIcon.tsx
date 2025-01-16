const CSMIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width="48"
      height="48"
      fill="currentColor"
      {...props}
    >
      <rect x="4" y="6" width="40" height="4" rx="2" />
      <rect x="12" y="14" width="24" height="4" rx="2" />
      <rect x="4" y="22" width="40" height="4" rx="2" />
      <rect x="12" y="30" width="24" height="4" rx="2" />
      <rect x="4" y="38" width="40" height="4" rx="2" />
    </svg>
  );
};

export default CSMIcon;
