import styles from "@/styles/layout.module.css";

type LayoutProps = {
  children: React.ReactNode;
  layout: "default" | "public" | "dashboard";
};

const Layout = ({ children, layout = "default" }: LayoutProps) => {
  console.log("🚀 ~ file: layout.tsx:9 ~ Layout ~ layout", layout);
  return (
    <div className="flex h-screen bg-blue-400">
      <div className="m-auto grid h-3/4 w-3/5 rounded-md bg-slate-50 lg:grid-cols-2">
        {/* left */}
        <div className={styles.imgStyle}>
          <div className={styles.cartoonImg}></div>
          <div className={styles.cloud_one}></div>
          <div className={styles.cloud_two}></div>
        </div>
        {/* right */}
        <div className="flex flex-col justify-evenly">
          <div className="text-center">{children}</div>
        </div>
      </div>
    </div>
  );
};
export default Layout;
