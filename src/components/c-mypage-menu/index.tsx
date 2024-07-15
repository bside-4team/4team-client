interface Props {
  title: string;
  items: {
    name: string;
    hasArrow?: boolean;
    clickEvent?: () => void;
    mail?: string;
  }[];
}

export default function CMypageMenu({ title, items }: Props) {
  const menuItem = `cursor-pointer flex justify-between items-center py-17 px-24 text-14 font-normal leading-[100%] border-0 last:border-solid last:border-b-1 last:border-neutral-bg20`;

  return (
    <div className="w-full pt-24">
      <div className="px-20 py-6 text-12 font-normal leading-[100%] text-neutral-bg30">{title}</div>

      {items?.map((d, i) =>
        d.mail ? (
          <a href="mailto:tastetionary@gmail.com" key={i} className={menuItem}>
            <span>{d.name}</span>

            {d?.hasArrow && <span>{'>'}</span>}
          </a>
        ) : (
          <div
            key={i}
            className={menuItem}
            onClick={() => {
              if (d.clickEvent) d.clickEvent();
            }}
          >
            <span>{d.name}</span>

            {d?.hasArrow && <span>{'>'}</span>}
          </div>
        )
      )}
    </div>
  );
}
