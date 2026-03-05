"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const fieldClass =
  "w-full h-10 bg-neutral-800 border border-white/10 text-white placeholder:text-neutral-500";

const labelClass = "text-sm font-medium text-neutral-200";

const AddService = () => {
  return (
    <div className="w-full ">
      <Card className="bg-neutral-900 border border-white/10 mx-auto mt-0">
        <CardContent className="p-6 md:p-8 space-y-6">

          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="flex flex-col gap-2 w-full">
              <label className={labelClass}>
                Service Title <span className="text-red-500">*</span>
              </label>

              <Input
                placeholder="e.g. Commercial Tyre Wraps"
                className={fieldClass}
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label className={labelClass}>
                Category <span className="text-red-500">*</span>
              </label>

              <Select>
                <SelectTrigger className={fieldClass}>
                  <SelectValue placeholder="Select a category..." />
                </SelectTrigger>

                <SelectContent className="bg-neutral-900 border-white/10">
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                </SelectContent>
              </Select>
            </div>

          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="flex flex-col gap-2 w-full">
              <label className={labelClass}>Est. Turnaround Time</label>

              <Select>
                <SelectTrigger className={fieldClass}>
                  <SelectValue placeholder="3 - 5 Days" />
                </SelectTrigger>

                <SelectContent className="bg-neutral-900 border-white/10">
                  <SelectItem value="1-2">1 - 2 Days</SelectItem>
                  <SelectItem value="3-5">3 - 5 Days</SelectItem>
                  <SelectItem value="1-week">1 Week</SelectItem>
                  <SelectItem value="2-weeks">2 Weeks</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label className={labelClass}>Amount</label>

              <Input
                type="number"
                placeholder="Enter amount"
                className={`${fieldClass} appearance-none`}
              />
            </div>

          </div>

          {/* Description */}
          <div className="flex flex-col gap-2 w-full">
            <label className={labelClass}>
              Description <span className="text-red-500">*</span>
            </label>

            <Textarea
              placeholder="Describe the service..."
              className="w-full min-h-[130px] bg-neutral-800 border border-white/10 text-white placeholder:text-neutral-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">

            <Button
              className="
              h-10 px-6
              bg-gradient-to-r
              from-indigo-500
              to-purple-500
              hover:from-indigo-600
              hover:to-purple-600
              text-white
              w-full sm:w-auto
              text-[15px]
              "
            >
              Create Service
            </Button>

            <Button
              variant="outline"
              className="
              h-10 px-6
              border-indigo-500
              text-indigo-400
              hover:bg-indigo-500/10
              w-full sm:w-auto
              text-[15px]
              "
            >
              Cancel
            </Button>

          </div>

        </CardContent>
      </Card>
    </div>
  );
};

export default AddService;