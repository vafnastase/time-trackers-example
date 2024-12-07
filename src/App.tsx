import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card.tsx";
import { Separator } from "./components/ui/separator.tsx";
import { Button } from "./components/ui/button.tsx";
import { useTimeTrackers } from "gnhub-time-trackers";
import { CheckIcon, PauseIcon, PlayIcon, XIcon } from "lucide-react";
import { Input } from "./components/ui/input.tsx";
import { useState } from "react";

function App() {
  const {
    addTracker,
    trackers,
    onCancel,
    onStart,
    onPause,
    onDone,
    onSaveDescription,
    formatElapsedTime,
  } = useTimeTrackers();

  return (
    <div className="container max-w-4xl mx-auto py-24">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl">GN-HUB</h1>
        <span>Time Trackers</span>
      </div>
      <Separator className="my-10" />
      <div>
        <Card>
          <CardHeader>
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-col gap-2">
                <CardTitle>My Trackers</CardTitle>
                <CardDescription>
                  Add and keep track of your time here.
                </CardDescription>
              </div>
              <Button variant="outline" onClick={() => addTracker({})}>
                Add Tracker
              </Button>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="py-4">
            <div className="flex flex-col gap-2">
              {trackers.map((tracker) => (
                <div key={tracker.id}>
                  <div className="grid grid-cols-12">
                    <div className="col-span-2 flex flex-row gap-1">
                      {tracker.isRunning ? (
                        <Button onClick={() => onPause(tracker.id)} size="icon">
                          <PauseIcon />
                        </Button>
                      ) : (
                        <Button onClick={() => onStart(tracker.id)} size="icon">
                          <PlayIcon />
                        </Button>
                      )}
                      {tracker.elapsedTime > 0 && (
                        <Button onClick={() => onDone(tracker.id)} size="icon">
                          <CheckIcon />
                        </Button>
                      )}
                    </div>
                    <div className="col-span-7">
                      <TrackerDescriptionField
                        id={tracker.id}
                        defaultValue={tracker.description}
                        onSaveDescription={onSaveDescription}
                      />
                    </div>
                    <div className="col-span-3 flex items-center gap-6 w-full justify-end">
                      <span className="text-xl font-semibold justify-self-center">
                        {formatElapsedTime(tracker.elapsedTime)}
                      </span>
                      <Button
                        variant="outline"
                        className="place-self-end"
                        onClick={() => onCancel(tracker.id)}
                        size="icon"
                      >
                        <XIcon />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const TrackerDescriptionField = ({
  id,
  onSaveDescription,
  defaultValue = "",
}) => {
  const [value, setValue] = useState(defaultValue);

  return (
    <Input
      placeholder="Tracker Description"
      defaultValue={defaultValue}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => onSaveDescription(id, value)}
    />
  );
};
export default App;
