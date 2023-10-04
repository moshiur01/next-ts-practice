import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";

import Link from "next/link";

const UMBreadCrumb = ({
  items,
}: {
  items: {
    label: string;
    link: string;
  }[];
}) => {
  const BreadCrumbItems = [
    {
      title: (
        <Link href="/">
          <HomeOutlined />
        </Link>
      ),
    },

    ...items.map((item) => {
      return {
        title: item.link ? (
          <Link href={item.link}>{item.label}</Link>
        ) : (
          <span>{item.label}</span>
        ),
      };
    }),
  ];
  return <Breadcrumb items={BreadCrumbItems}></Breadcrumb>;
};

export default UMBreadCrumb;
