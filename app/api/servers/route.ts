import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { ChannelType, MemberRole } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const { imageUrl, name } = await req.json();
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const server = await db.server.create({
      data: {
        profileId: profile.id,
        name,
        imageUrl,
        inviteCode: uuidv4(),
        members: {
          create: {
            profileId: profile?.id,
            role: MemberRole.ADMIN,
          },
        },
        channels: {
          create:{
            name: 'general',
            type: ChannelType.TEXT,
            profileId: profile.id
          }
        }
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
