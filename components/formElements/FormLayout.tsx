import layoutStyle from "@/app/layout.module.css"
import formStyle from "@/components/formElements/Form.module.css"
import Image from "next/image";

export default function FormLayout({children} : {children : React.ReactNode}) {

  return (
    <div className={formStyle.formLayout}>
      <div className={formStyle.formSection}>
        <div className={formStyle.card}>
          {children}
        </div>
      </div>
      <div className={formStyle.formSection}>
        <div className={layoutStyle.imgWrapperFull}>
          <Image src={"/placeholder.jpeg"} alt={"flower"} style={{objectFit: "cover"}} fill sizes='50vw'/>
        </div>
      </div>
    </div>
  )
}