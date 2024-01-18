import { SlidersHorizontal } from "lucide-react";
import { useEditProfileContext } from "../../../context/EditProfileContext";
import { Button } from "./button";

function EditProfileIcon({ hiddenRoutes, pathname }: CartIconProps) {
  const { setEditProfileSheetOpen } = useEditProfileContext();
  return (
    <div style={{ position: "relative" }}>
      {!hiddenRoutes.includes(pathname) && (
        
        <Button
          className="m-0 p-0 bg-white hover:bg-slate-100 rounded-full w-7 h-7"
          onClick={() => {
            setEditProfileSheetOpen(true);
          }}
        >
          <SlidersHorizontal size={15} />
        </Button>
      )}
    </div>
  );
}

export default EditProfileIcon;
